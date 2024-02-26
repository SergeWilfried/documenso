import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { env } from 'next-runtime-env';

import { IS_GOOGLE_SSO_ENABLED } from '@documenso/lib/constants/auth';
import { createTranslation } from '@documenso/lib/i18n/server';
import { decryptSecondaryData } from '@documenso/lib/server-only/crypto/decrypt';

import { SignUpForm } from '~/components/forms/signup';

export const metadata: Metadata = {
  title: 'Sign Up',
};

type SignUpPageProps = {
  searchParams: {
    email?: string;
  };
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const NEXT_PUBLIC_DISABLE_SIGNUP = env('NEXT_PUBLIC_DISABLE_SIGNUP');

  if (NEXT_PUBLIC_DISABLE_SIGNUP === 'true') {
    redirect('/signin');
  }
  const { t } = await createTranslation('web');
  const rawEmail = typeof searchParams.email === 'string' ? searchParams.email : undefined;
  const email = rawEmail ? decryptSecondaryData(rawEmail) : null;

  if (!email && rawEmail) {
    redirect('/signup');
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold">{t('create-a-new-account')}</h1>

      <p className="text-muted-foreground/60 mt-2 text-sm">
        {t('create-your-account-and-start-using')}
      </p>

      <SignUpForm
        className="mt-4"
        initialEmail={email || undefined}
        isGoogleSSOEnabled={IS_GOOGLE_SSO_ENABLED}
      />

      <p className="text-muted-foreground mt-6 text-center text-sm">
        {t('already-have-an-account')}{' '}
        <Link href="/signin" className="text-primary duration-200 hover:opacity-70">
          {t('sign-in-instead')}
        </Link>
      </p>
    </div>
  );
}
