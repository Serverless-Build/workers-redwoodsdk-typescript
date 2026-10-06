'use client';

import { useState } from 'react';
import { quote } from './server-functions';
import type { QuoteResult } from '../quote';

export function Interactions() {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState<QuoteResult>();
  const [pending, setPending] = useState(false);
  return <>
    <section><span className="step">02 / Client Component</span><h2>A hydrated React island.</h2><p>The counter is local browser state. The surrounding page is a Server Component.</p><button type="button" onClick={() => setCount(count + 1)}>Count: {count}</button></section>
    <section className="wide"><span className="step">03 / Server Function</span><h2>Run a function on the Worker.</h2><p>The imported function runs on the server, validates the inputs, and returns a typed quote through the RSC protocol.</p>
      <form onSubmit={async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        setPending(true);
        try { setResult(await quote({ quantity: String(form.get('quantity')), unit_price_cents: String(form.get('unit_price_cents')) })); }
        catch { setResult({ error: 'The server could not calculate the quote. Please try again.' }); }
        finally { setPending(false); }
      }}><label>Quantity<input name="quantity" type="number" min="1" max="100" step="1" defaultValue="3" required /></label><label>Unit price (cents)<input name="unit_price_cents" type="number" min="1" max="1000000" step="1" defaultValue="250" required /></label><button disabled={pending}>{pending ? 'Calculating…' : 'Calculate a quote'}</button></form>
      <output id="result" aria-live="polite">{result ? 'error' in result ? result.error : `${result.total_cents} cents · ${result.currency}` : 'Your server-calculated quote will appear here.'}</output>
    </section>
  </>;
}
