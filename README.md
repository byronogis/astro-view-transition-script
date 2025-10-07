# astro-view-transition-script

<!-- automd:badges name="astro-view-transition-script" license codecov bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/astro-view-transition-script)](https://npmjs.com/package/astro-view-transition-script)
[![npm downloads](https://img.shields.io/npm/dm/astro-view-transition-script)](https://npm.chart.dev/astro-view-transition-script)
[![bundle size](https://img.shields.io/bundlephobia/minzip/astro-view-transition-script)](https://bundlephobia.com/package/astro-view-transition-script)
[![install size](https://badgen.net/packagephobia/install/astro-view-transition-script)](https://packagephobia.com/result?p=astro-view-transition-script)
[![codecov](https://img.shields.io/codecov/c/gh/byronogis/astro-view-transition-script)](https://codecov.io/gh/byronogis/astro-view-transition-script)
[![license](https://img.shields.io/github/license/byronogis/astro-view-transition-script)](https://github.com/byronogis/astro-view-transition-script/blob/main/LICENSE)

<!-- /automd -->

[![JSDocs][jsdocs-src]][jsdocs-href]

A utility function to execute a callback that compatibly with Astro's view transitions.

## Installation

<!-- automd:pm-install name="astro-view-transition-script" -->

```sh
# ✨ Auto-detect
npx nypm install astro-view-transition-script

# npm
npm install astro-view-transition-script

# yarn
yarn add astro-view-transition-script

# pnpm
pnpm add astro-view-transition-script

# bun
bun install astro-view-transition-script

# deno
deno install npm:astro-view-transition-script
```

<!-- /automd -->

## Basic Usage

```astro
---
// ...
---

<script>
  import { withwithViewTransition } from 'astro-view-transition-script';

  withViewTransition({
    // ...
  })
</script>
```

## Example

```ts
/**
 * apply theme on initial and navigating
 */
function applyTheme(state) {
  localStorage.theme === 'dark'
    ? state.document.documentElement.classList.add('dark')
    : state.document.documentElement.classList.remove('dark')
}

withViewTransition({
  initial: applyTheme,
  beforeSwap: applyTheme,
})
```

```ts
/**
 * avoid smooth scroll when navigating back/forward
 * @see https://github.com/withastro/astro/issues/10615#issuecomment-3289385496
 */
withViewTransition({
  beforeSwap(state, e) {
    state.document.documentElement.style.scrollBehavior
      = e.navigationType === 'traverse' ? 'auto' : 'smooth'
  },
  done(state) {
    state.document.documentElement.style.scrollBehavior = 'smooth'
  },
})
```

<!-- automd:fetch url="gh:byronogis/.github/main/snippets/readme-contrib-node-pnpm.md" -->

## Contribution

<details>
  <summary>Local development</summary>

- Clone this repository
- Install the latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run tests using `pnpm dev` or `pnpm test`

</details>

<!-- /automd -->

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/byronogis/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/byronogis/static/sponsors.svg'/>
  </a>
</p>

## License

<!-- automd:contributors author="byronogis" license="MIT" -->

Published under the [MIT](https://github.com/byronogis/astro-view-transition-script/blob/main/LICENSE) license.
Made by [@byronogis](https://github.com/byronogis) and [community](https://github.com/byronogis/astro-view-transition-script/graphs/contributors) 💛
<br><br>
<a href="https://github.com/byronogis/astro-view-transition-script/graphs/contributors">
<img src="https://contrib.rocks/image?repo=byronogis/astro-view-transition-script" />
</a>

<!-- /automd -->

<!-- automd:with-automd lastUpdate -->

---

_🤖 auto updated with [automd](https://automd.unjs.io) (last updated: Tue Oct 07 2025)_

<!-- /automd -->

<!-- Badges -->

[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-1fa669
[jsdocs-href]: https://www.jsdocs.io/package/astro-view-transition-script
