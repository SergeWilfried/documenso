import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { env } from 'next-runtime-env';

import { IS_GOOGLE_SSO_ENABLED } from '@documenso/lib/constants/auth';
import { createTranslation } from '@documenso/lib/i18n/server';
import { decryptSecondaryData } from '@documenso/lib/server-only/crypto/decrypt';

import { SignInForm } from '~/components/forms/signin';

export const metadata: Metadata = {
  title: 'Sign In',
};

type SignInPageProps = {
  searchParams: {
    email?: string;
  };
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const NEXT_PUBLIC_DISABLE_SIGNUP = env('NEXT_PUBLIC_DISABLE_SIGNUP');
  const { t } = await createTranslation('web');

  const rawEmail = typeof searchParams.email === 'string' ? searchParams.email : undefined;
  const email = rawEmail ? decryptSecondaryData(rawEmail) : null;

  if (!email && rawEmail) {
    redirect('/signin');
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold">{t('sign-in-to-your-account')}</h1>

      <p className="text-muted-foreground/60 mt-2 text-sm">
        {t('welcome-back-we-are-lucky-to-have-you')}
      </p>

      <SignInForm
        className="mt-4"
        initialEmail={email || undefined}
        isGoogleSSOEnabled={IS_GOOGLE_SSO_ENABLED}
      />

      {NEXT_PUBLIC_DISABLE_SIGNUP !== 'true' && (
        <p className="text-muted-foreground mt-6 text-center text-sm">
          {t('dont-have-an-account')}{' '}
          <Link href="/signup" className="text-primary duration-200 hover:opacity-70">
            {t('sign-up')}
          </Link>
        </p>
      )}

      <p className="mt-2.5 text-center">
        <Link
          href="/forgot-password"
          className="text-muted-foreground text-sm duration-200 hover:opacity-70"
        >
          {t('forgot-your-password')}
        </Link>
      </p>
    </div>
  );
}
