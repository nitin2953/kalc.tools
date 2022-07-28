---
title: Get consistent CSS border widths using outline & box-shadow
desc: Small border widths of table cells and repeated elements don't look consistant on displays with low DPI, here is a simple trick to get VERY consistent border widths.
---

Ever thought why inner border width of `<table>` cells or height multiple `<hr>` look inconsistent? Well, it's because of the <dfn>DPR</dfn> (Device Pixel Ratio) of the display you are them at. A standard 15.6" 1080p laptop display have a DPR of 1.25, while these days a mobile device could have DPR more than 3 alough older ones had DPR between 1.5 & 3.

## Role of DPR in rendering
`border-width` and `width/height` are part of CSS box model, both affect the layout of the element and eventually whole page. Browser rendering engine can't render more pixels in between of pixels present in the display, it always have to round the color value to the nearest pixel, <abbr title="also known as">aka</abbr> Anti-aliasing.

## Understand this by example:
1. If we render 1px width on a display with DPR of 1.25, the browser will use 1.25 physical pixels for 1 pixel.
2. If we render 1px width on a retina display with DPR of 3, the browser will use 3 physical pixels for just 1 pixel.

## Solution:
We have to use those CSS properties that are not a part of box model or simply those that don't affect the layout of element, these properties are `outline` & `box-shadow` both render on a different layer thus don't affect the layout of element. But using `box-shadow` on more element will affect performance of pages with many interactive elements, thats why it is advisable to use `box-shadow` on only few elements.

```css
/* Use outline for more elemnts */
table {
  outline: 2px solid #ccc;
}
table td {
  outline: 1px solid #ccc;
}


/* Use box-shadow for few elemnts */
hr {
  border: none;
  box-shadow: 0 0 0 1px #ccc;
}
```

## Downside of using outline on table cells
- You will have to use more `padding` as `outline` won't affect the layout of table cells.
- On displays with DPR of 1.25, you are stuck with 1px outline thickness, no matter if you set `outline-width` to `0.5px` or `0.1px`, beacause of no `border` table cells are overlaping, `0.5px + 0.5px = 1px` or `0.1px + 0.1px = 0.2px` browsers will round to `1px`.
