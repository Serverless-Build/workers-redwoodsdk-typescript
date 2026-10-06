# RedwoodSDK on Workers

A Workers-first RedwoodSDK 1 app with explicit routing, React Server Components, hydrated Client Components, and a real Server Function.

## Run and deploy

Use Node.js 22.22 or later. `.node-version` pins the tested Node 24.21.0 toolchain.

```sh
npm ci
npm run dev
```

```sh
npm run check
npm run bundle
npm run start
```

`check` generates Workers types, checks TypeScript, builds, and performs a Wrangler dry run. `bundle` writes the reviewed upload to `dist/worker-bundle`. `start` previews the built app in Workers. Log in with Wrangler, select your account, and use `npm run deploy`.

The example uses the standard `render()` router integration so that HTML rendering, the RSC protocol, and Server Functions work together. React, React DOM, and React's server-components package use matching versions. Generated types and build outputs stay out of published source.

## Try it

- Open `/`. `Home` is a Server Component; request-scoped middleware supplies its fresh timestamp. Refresh to reset the browser counter.
- Submit the form. The Client Component calls `quote` from a `use server` module. Validation and calculation run on the Worker.
- `GET /api/health` checks liveness.
- `GET /api/quote?quantity=3&unit_price_cents=250` returns 750 cents in USD. Quantity must be one integer 1–100, unit price one integer 1–1000000. Missing, duplicate, decimal, and out-of-range inputs return 400.
- `/robots.txt` and built JS/CSS are served by Workers Static Assets.

This stateless example uses `no-store`, permits HTTPS embedding and loopback development, and needs no database, authentication setup, or application Durable Object.

See [RedwoodSDK on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/redwoodsdk/) and [Server Components and Server Functions](https://docs.rwsdk.com/core/react-server-components/).

## Pattern and live demo

- [Pattern page](https://serverless.build/patterns/redwoodsdk-workers)
- [Live deployment](https://workers-redwoodsdk-typescript.dwarven.workers.dev)
