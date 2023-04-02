import { deployBundle } from "../deploy";

deployBundle({
  name: "navigation",
  contractVersion: "0.0.1",
  umdBundlePath: new URL(
    "../dist/example-tiny-frontend.umd.js",
    import.meta.url
  ).pathname,
  cloudflare: {
    accountIdentifier: process.env.CF_ACCOUNT_ID,
    apiToken: process.env.CF_API_TOKEN,
    kvNamespaceIdentifier: process.env.CF_KV_NAMESPACE,
  },
});
