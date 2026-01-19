# Professional Portfolio Website — Nitish Chowdary K

## Overview
A responsive professional portfolio website built with semantic HTML and an external CSS file only. Includes navigation, a styled experience table, a contact form, and two mandatory responsive UI components: Testimonials and Image Gallery (with hover effects).

## Files
- index.html
- style.css
- readme.md
- favicon.png
- profile.jpg

## Semantic Elements Used
- header: site header + navigation + hero
- main: primary page content container
- section: About, Skills, Projects, Experience, Testimonials, Gallery, Contact
- article: hero content, project cards, testimonial cards, form card
- aside: profile card and contact info card
- footer: copyright area

## HTML Controls Used
- nav: navigation links
- table: experience table
- form: contact form
- button: submit/reset
- input/select/textarea: form controls

## Table CSS Selectors Used
- `.exp-table thead th` (header styling)
- `.exp-table tbody tr:nth-child(even)` (zebra striping)
- `.exp-table tbody tr:hover` (hover highlight)

## Responsive Requirements
Media queries implemented for:
- iPad width: 768px
- Smartphone width: 375px

## Flexbox Properties Used
- align-items
- justify-content
- flex-direction
- flex-wrap
- flex-grow (via `flex: 1` and `flex: 2`)
