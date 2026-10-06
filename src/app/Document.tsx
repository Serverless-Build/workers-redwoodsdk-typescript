import type { ReactNode } from 'react';
import css from '../style.css?url';

export function Document({ children }: { children: ReactNode }) {
  return <html lang="en"><head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>RedwoodSDK on Workers</title><link rel="stylesheet" href={css} /><link rel="modulepreload" href="/src/client.tsx" /></head><body>{children}<script>import("/src/client.tsx")</script></body></html>;
}
