import { defineApp } from 'rwsdk/worker';
import { render, route } from 'rwsdk/router';
import { Document } from './app/Document';
import { Home } from './app/Home';
import { calculateQuote } from './quote';

export type AppContext = { renderedAt: string };

export default defineApp([
  ({ ctx, response }) => {
    ctx.renderedAt = new Date().toISOString();
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Content-Security-Policy', 'frame-ancestors https: http://localhost:* http://127.0.0.1:*');
  },
  route('/api/health', ({ request }) => {
    if (!['GET', 'HEAD'].includes(request.method)) return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'GET, HEAD' } });
    return Response.json({ ok: true, framework: 'RedwoodSDK', marker: 'SERVERLESS_BUILD_REDWOODSDK_TYPESCRIPT_V1' });
  }),
  route('/api/quote', ({ request }) => {
    if (!['GET', 'HEAD'].includes(request.method)) return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'GET, HEAD' } });
    const result = calculateQuote(new URL(request.url).searchParams);
    return Response.json(result, { status: 'error' in result ? 400 : 200 });
  }),
  render(Document, [route('/', Home)]),
]);
