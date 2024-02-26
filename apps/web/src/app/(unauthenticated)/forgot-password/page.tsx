import { createTranslation } from '@documenso/lib/i18n/server';
import type { Metadata } from 'next';
import Link from 'next/link';

import { ForgotPasswordForm } from '~/components/forms/forgot-password';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default async function ForgotPasswordPage() {
  const { t } = await createTranslation('web');

  return (
    <div>
      <h1 className="text-4xl font-semibold">{t('forgot-your-password')}</h1>

      <p className="text-muted-foreground mt-2 text-sm">
        {t('no-worries-it-happens-enter-your-email')}
      </p>

      <ForgotPasswordForm className="mt-4" />

      <p className="text-muted-foreground mt-6 text-center text-sm">
        {t('remembered-your-password')}{' '}
        <Link href="/signin" className="text-primary duration-200 hover:opacity-70">
          {t('sign-in')}
        </Link>
      </p>
    </div>
  );
}
