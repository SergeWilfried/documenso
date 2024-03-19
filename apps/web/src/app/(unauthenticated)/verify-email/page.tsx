import type { Metadata } from 'next';
import Link from 'next/link';

import { XCircle } from 'lucide-react';

import { createTranslation } from '@documenso/lib/i18n/server';
import { Button } from '@documenso/ui/primitives/button';

export const metadata: Metadata = {
  title: 'Verify Email',
};

export default async function EmailVerificationWithoutTokenPage() {
  const { t } = await createTranslation('web');

  return (
    <div className="w-screen max-w-lg px-4">
      <div className="flex w-full items-start">
        <div className="mr-4 mt-1 hidden md:block">
          <XCircle className="text-destructive h-10 w-10" strokeWidth={2} />
        </div>

        <div>
          <h2 className="text-2xl font-bold md:text-4xl">
            {t('uh-oh-looks-like-youre-missing-a-token')}
          </h2>

          <p className="text-muted-foreground mt-4">
            {t('it-seems-that-there-is-no-token-provided')}
          </p>

          <Button className="mt-4" asChild>
            <Link href="/">{t('go-back-home')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
