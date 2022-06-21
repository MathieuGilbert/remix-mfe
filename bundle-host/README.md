# Bundle Host

## API

The API responds to 2 routes:

- `/latest/{mfeName}/{bundleVersion}`

Returns

```js
{
  "umdBundle": "umd-bundle-name.js",
  "cssBundle": "css-bundle-name.js" // not implemented
}
```

- `/bundle/{bundleName}`

Returns the JavaScript source.
