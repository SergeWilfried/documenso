import type { Metadata } from 'next';
import Link from 'next/link';

import { ForgotPasswordForm } from '~/components/forms/forgot-password';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default function ForgotPasswordPage() {
  return (
    <div className="w-screen max-w-lg px-4">
      <div className="w-full">
        <h1 className="text-3xl font-semibold">Mot de passe oublié?</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          Pas de soucis ! Saisissez votre email et nous vous enverrons un lien spécial pour
          réinitialiser votre mot de passe.
        </p>

        <ForgotPasswordForm className="mt-4" />

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Vous avez retrouvé votre mot de passe ?{' '}
          <Link href="/signin" className="text-primary duration-200 hover:opacity-70">
            Me connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
