import type { Metadata } from 'next';
import Link from 'next/link';

import { createTranslation } from '@documenso/lib/i18n/server';
import { Button } from '@documenso/ui/primitives/button';

export const metadata: Metadata = {
  title: 'Forgot password',
};

export default async function ForgotPasswordPage() {
  const { t } = await createTranslation('web');

  return (
    <div>
      <h1 className="text-4xl font-semibold">{t('email-sent')}</h1>

      <p className="text-muted-foreground mb-4 mt-2 text-sm">{t('a-password-reset-email-has')}</p>

      <Button asChild>
        <Link href="/signin">{t('return-to-sign-in')}</Link>
      </Button>
    </div>
  );
}
