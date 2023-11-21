import { Suspense } from 'react';

import { Caveat, Inter } from 'next/font/google';

import { FeatureFlagProvider } from '@documenso/lib/client-only/providers/feature-flag';
import { getAllAnonymousFlags } from '@documenso/lib/universal/get-feature-flag';
import { TrpcProvider } from '@documenso/trpc/react';
import { cn } from '@documenso/ui/lib/utils';
import { Toaster } from '@documenso/ui/primitives/toaster';

import { ThemeProvider } from '~/providers/next-theme';
import { PlausibleProvider } from '~/providers/plausible';
import { PostHogPageview } from '~/providers/posthog';

import './globals.css';

const fontInter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const fontCaveat = Caveat({ subsets: ['latin'], variable: '--font-signature' });

export const metadata = {
  title: 'Notario - Simplifiez Vos Signatures, Securisez Vos Documents',
  description:
    'Rejoignez Notario votre solution de signature numérique offrant une expérience 10 fois meilleure de signature. À partir de 30 $/mois, cette tarification est garantie à vie ! Inscrivez-vous dès maintenant pour bénéficier dun processus de signature de documents plus rapide, plus intelligent et plus intuitif.',
  keywords:
    'Notario, signature numérique, signature de documents, signature rapide, modèles contrats intelligents',
  authors: { name: 'Notario, Inc.' },
  robots: 'index, follow',
  openGraph: {
    title: 'Notario - Simplifiez Vos Signatures, Securisez Vos Documents',
    description:
      'Rejoignez Notario votre solution de signature numérique offrant une expérience 10 fois meilleure de signature. À partir de 30 $/mois, cette tarification est garantie à vie ! Inscrivez-vous dès maintenant pour bénéficier dun processus de signature de documents plus rapide, plus intelligent et plus intuitif.',
    type: 'website',
    images: [`${process.env.NEXT_PUBLIC_MARKETING_URL}/opengraph-image.jpg`],
  },
  twitter: {
    site: '@notario',
    card: 'summary_large_image',
    images: [`${process.env.NEXT_PUBLIC_MARKETING_URL}/opengraph-image.jpg`],
    description:
      'Rejoignez Notario votre solution de signature numérique offrant une expérience 10 fois meilleure de signature. À partir de 30 $/mois, cette tarification est garantie à vie ! Inscrivez-vous dès maintenant pour bénéficier dun processus de signature de documents plus rapide, plus intelligent et plus intuitif.',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const flags = await getAllAnonymousFlags();

  return (
    <html
      lang="en"
      className={cn(fontInter.variable, fontCaveat.variable)}
      suppressHydrationWarning
    >
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <Suspense>
        <PostHogPageview />
      </Suspense>

      <body>
        <FeatureFlagProvider initialFlags={flags}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <PlausibleProvider>
              <TrpcProvider>{children}</TrpcProvider>
            </PlausibleProvider>
          </ThemeProvider>
        </FeatureFlagProvider>

        <Toaster />
      </body>
    </html>
  );
}
