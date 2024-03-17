import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createTranslation } from '@documenso/lib/i18n/server';
import { getResetTokenValidity } from '@documenso/lib/server-only/user/get-reset-token-validity';

import { ResetPasswordForm } from '~/components/forms/reset-password';

type ResetPasswordPageProps = {
  params: {
    token: string;
  };
};

export default async function ResetPasswordPage({ params: { token } }: ResetPasswordPageProps) {
  const { t } = await createTranslation('web');

  const isValid = await getResetTokenValidity({ token });

  if (!isValid) {
    redirect('/reset-password');
  }

  return (
    <div className="w-full">
      <h1 className="text-4xl font-semibold">{t('reset-password')}</h1>

      <p className="text-muted-foreground mt-2 text-sm">{t('please-choose-your-new-password')} </p>

        <ResetPasswordForm token={token} className="mt-4" />

      <p className="text-muted-foreground mt-6 text-center text-sm">
        {t('dont-have-an-account')}{' '}
        <Link href="/signup" className="text-primary duration-200 hover:opacity-70">
          {t('sign-up')}
        </Link>
      </p>
    </div>
  );
}
