# Assignment 7 – Two-Page Website (Grid, Flexbox, SCSS)

## Pages
- `index.html` (Home)
- `services.html` (Services)

## Layout requirements
- CSS Grid: `scss/layout/_grid.scss` used in `index.html`
- Flexbox: `scss/layout/_flex.scss` used in `services.html`
- Flexbox also used in navbar via mixin (`flex-center`)

## SCSS features used
- Variables: `utilities/_variables.scss`
- CSS Custom Properties: `:root` in `utilities/_variables.scss`
- Nesting: navbar links in `components/_navbar.scss`
- Interpolation: `.#{$variant}` in `components/_card.scss`
- Placeholder selectors: `%surface` in `utilities/_placeholders.scss`
- Mixins: `flex-center`, `card-style` in `utilities/_mixins.scss`
- Functions: `rem()` in `utilities/_functions.scss`
- Additional: modular partials, `@import`, `@extend`

## Run locally
Open `index.html` in a browser.

## Compile SCSS to CSS
```bash
sass scss/main.scss css/main.css
