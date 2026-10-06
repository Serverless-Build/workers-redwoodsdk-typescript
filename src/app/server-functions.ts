'use server';

import { calculateQuote, type QuoteResult } from '../quote';

export async function quote(input: { quantity: string; unit_price_cents: string }): Promise<QuoteResult> {
  return calculateQuote(input);
}
