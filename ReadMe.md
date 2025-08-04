# Zod Demo

> TypeScript-first schema validation with static type inference by [@colinhacks](https://x.com/colinhacks).

a toy app to explore how Zod could impact our JavaScript development

## Ecosystem

- You can use [QuickType](https://app.quicktype.io/) to generate Zod types (many other languages, too) from JSON.
- Zod integrates with [other tools](https://zod.dev/ecosystem) in the JavaScript ecosystem.

## No-Dependency Alternatives

JSDoc in JavaScript can generate [simple, reusable types](https://docs.joshuatz.com/cheatsheets/js/jsdoc/#vscode---javascript-type-safety-with-jsdoc).

```js

/**
 * Processes an array of activity objects using adapters.
 *
 * @param {Array<Object>} activities - The list of activity objects to process.
 * @param {Record<string, function(Object): Object>} adapters - An object mapping source names to adapter functions.
 * @returns {Array<Object>} The processed activities.
 */

function processActivitiesWithoutZod(activities, adapters) {
  const processed = [];

  for (const activity of activities) {
    try {
      //...
```
