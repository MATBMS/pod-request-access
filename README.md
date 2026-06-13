# Frontend Mentor - Pod request access landing page

This is a solution to the [Pod request access landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/pod-request-access-landing-page-eyTmdkLSG). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Extra feature](#extra-feature)
  - [What I learned](#what-i-learned)

## Overview

### Screenshot

![Screenshot Preview](./images/preview.jpg)

### Links

- [Solution URL](https://github.com/MATBMS/pod-request-access)
- [Live Site URL](https://matbms-pod-request-access.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow

### Extra feature

As a first-time visitor,<br>
I want visible confirmation after I submit a valid email,<br>
so that I know my submission was registered and understand this is a learning demo.

### What I learned

I learned how to use a **regular expression (regex)** to validate an email address. Because the form is marked `novalidate`, the browser's built-in `type="email"` check is turned off, so this pattern is the sole gate before showing the confirmation:

```js
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

Reading it left to right: one or more characters that aren't a space or `@`, then a literal `@`, then more non-space/non-`@` characters, a literal `.`, and a final chunk — i.e. `local@domain.tld`. It's a deliberately simple shape check rather than a fully RFC-compliant validator, which keeps it readable and lets me surface my own error message instead of the browser's default bubble.
