import type { AppContext } from '../worker';
import { Interactions } from './Interactions';

export function Home({ ctx }: { ctx: AppContext }) {
  return <main>
    <header><span className="badge">RedwoodSDK · Cloudflare Workers</span><h1>Server Components.<br /><em>Workers, from the start.</em></h1><p className="intro">An explicit Worker entrypoint, React Server Components, and Server Functions, powered by RedwoodSDK.</p></header>
    <div className="grid">
      <section><span className="step">01 / React Server Component</span><h2>Rendered on the Worker.</h2><p>This component reads request-scoped context on the server. Refresh for a new timestamp.</p><time dateTime={ctx.renderedAt}>{ctx.renderedAt}</time><p className="muted">Cloudflare Workers · no-store</p></section>
      <Interactions />
    </div><footer>RedwoodSDK routing + RSC · Workers Static Assets · <a href="/api/health">Health</a> · <a href="/api/quote?quantity=3&unit_price_cents=250">JSON API</a></footer>
  </main>;
}
