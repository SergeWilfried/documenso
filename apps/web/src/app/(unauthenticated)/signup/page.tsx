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

    <SignUpFormV2
      className="w-screen max-w-screen-2xl px-4 md:px-16 lg:-my-16"
      initialEmail={email || undefined}
      isGoogleSSOEnabled={IS_GOOGLE_SSO_ENABLED}
    />
  );
}
