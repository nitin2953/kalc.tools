const { src, dest, watch, series, parallel } = require("gulp");
const gulpif = require("gulp-if");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const concat = require("gulp-concat");

const browserSync = require("browser-sync").create();
const qrcode = require("qrcode-terminal");
const devIp = require("dev-ip");
const fs = require("fs");

let isProduction = process.env.NODE_ENV === "production";
let isDevelopment = !isProduction;
console.log(isProduction ? "********* GULP PRODUCTION MODE *********" : "********* GULP DEVELOPMENT MODE *********");

//─────────────────────────────────────────────────────────//

const dir = {
	local: {
		jses: "./local/*.js",
		js_1: "./local/1.js",
		js_2: "./local/2.js",
	},
	src: {
		scss: "./src/assets/scss/*.scss",
		scsses: "./src/assets/scss/**/*.scss",
		main_js: "./src/assets/js/main/*.js",
		sec_js: "./src/assets/js/*.js",
		njk: "./src/site/**/*.njk",

		i_scss: "./src/assets/i-scss/**/*.scss",
		i_js: "./src/assets/i-js/**/*.js",
	},
	dest: {
		html: "./dist/**/*.html",
		css: "./dist/assets/css",
		js: "./dist/assets/js",

		i_css: "./src/_includes/i-css",
		i_js: "./src/_includes/i-js",
	},
	dist: "./dist",
};

const terserOptions = { toplevel: isProduction };

const browserSyncOptions = {
	// proxy: "kalc.local",
	server: { baseDir: dir.dist },
	port: 5555,
	ui: false,
	open: false,
	notify: false,
	ghostMode: false,
};

const page_404 = fs.existsSync("dist/404.html") ? fs.readFileSync("dist/404.html") : "404";
const bs404 = (err, bs) => {
	bs.addMiddleware("*", (req, res) => {
		res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
		res.write(page_404);
		res.end();
	});
};

//─────────────────────────────────────────────────────────//

function css() {
	return src(dir.src.scss, { sourcemaps: isDevelopment })
		.pipe(sass().on("error", sass.logError))
		// .pipe(concat("main.css")) // DON'T CONCAT WHEN MULTIPLE SEPARATE FILES
		.pipe(gulpif(isProduction, postcss([cssnano()])))
		.pipe(dest(dir.dest.css, { sourcemaps: "." }))
		.pipe(browserSync.stream());
}
exports.css = css;

function i_scss() {
	return src(dir.src.i_scss)
		.pipe(sass().on("error", sass.logError))
		.pipe(gulpif(isProduction, postcss([cssnano()])))
		.pipe(dest(dir.dest.i_css));
}
exports.i_scss = i_scss;

//─────────────────────────────────────────────────────────//

function js_1() {
	return src(gulpif(isProduction, dir.src.main_js, [dir.local.js_1, dir.src.main_js, dir.local.js_2]), { sourcemaps: isDevelopment })
		.pipe(concat("main.js"))
		.pipe(gulpif(isProduction, terser(terserOptions)))
		.pipe(dest(dir.dest.js, { sourcemaps: "." }))
		.pipe(browserSync.stream());
}
exports.js_1 = js_1;

function js_2() {
	return src(dir.src.sec_js, { sourcemaps: isDevelopment })
		.pipe(gulpif(isProduction, terser(terserOptions)))
		.pipe(dest(dir.dest.js, { sourcemaps: "." }))
		.pipe(browserSync.stream());
}
exports.js_2 = js_2;

function i_js() {
	return src(dir.src.i_js)
		.pipe(gulpif(isProduction, terser(terserOptions)))
		.pipe(dest(dir.dest.i_js));
}
exports.i_js = i_js;

//─────────────────────────────────────────────────────────//

function watchTask() {
	css(); i_scss(); js_1(); js_2(); i_js();

	watch(dir.src.scsses, css);
	watch(dir.src.i_scss, i_scss);

	watch(gulpif(isProduction, dir.src.main_js, [dir.src.main_js, dir.local.jses]), js_1);
	watch(dir.src.sec_js, js_2);
	watch(dir.src.i_js, i_js);

	watch(dir.dest.html).on("change", browserSync.reload);
	watch("./dist/assets/js/*.js").on("change", browserSync.reload);
}
exports.watch = watchTask;

function serve() {
	watchTask();
	browserSync.init(browserSyncOptions, bs404);
	let devip = "http://" + devIp()[0] + ":" + browserSyncOptions.port;
	if (devIp()[0]) qrcode.generate(devip, { small: true });
}
exports.serve = serve;

exports.build = parallel(css, i_scss, js_1, js_2, i_js);
exports.default = parallel(css, i_scss, js_1, js_2, i_js);
