import Link from 'next/link';

import { AlertTriangle, CheckCircle2, XCircle, XOctagon } from 'lucide-react';

import { createTranslation } from '@documenso/lib/i18n/server';
import { verifyEmail } from '@documenso/lib/server-only/user/verify-email';
import { Button } from '@documenso/ui/primitives/button';

export type PageProps = {
  params: {
    token: string;
  };
};

export default async function VerifyEmailPage({ params: { token } }: PageProps) {
  const { t } = await createTranslation('web');
  if (!token) {
    return (
      <div className="w-full">
        <div className="mb-4 text-red-300">
          <XOctagon />
        </div>

        <h2 className="text-4xl font-semibold">{t('no-token-provided')}</h2>
        <p className="text-muted-foreground mt-2 text-base">
          {t('it-seems-that-there-is-no-token')}
        </p>
      </div>
    );
  }

  const verified = await verifyEmail({ token });

  if (verified === null) {
    return (
      <div className="flex w-full items-start">
        <div className="mr-4 mt-1 hidden md:block">
          <AlertTriangle className="h-10 w-10 text-yellow-500" strokeWidth={2} />
        </div>

        <div>
          <h2 className="text-2xl font-bold md:text-4xl">{t('something-went-wrong')}</h2>

          <p className="text-muted-foreground mt-4">{t('we-were-unable-to-verify-your')}</p>

          <Button className="mt-4" asChild>
            <Link href="/">{t('go-back-home')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="flex w-full items-start">
        <div className="mr-4 mt-1 hidden md:block">
          <XCircle className="text-destructive h-10 w-10" strokeWidth={2} />
        </div>

        <div>
          <h2 className="text-2xl font-bold md:text-4xl">{t('your-token-has-expired')}</h2>

          <p className="text-muted-foreground mt-4">{t('it-seems-that-the-provided-token')}</p>

          <Button className="mt-4" asChild>
            <Link href="/">{t('go-back-home')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-start">
      <div className="mr-4 mt-1 hidden md:block">
        <CheckCircle2 className="h-10 w-10 text-green-500" strokeWidth={2} />
      </div>

      <div>
        <h2 className="text-2xl font-bold md:text-4xl">{t('email-confirmed')}</h2>

        <p className="text-muted-foreground mt-4">{t('your-email-has-been-successfully')}</p>

        <Button className="mt-4" asChild>
          <Link href="/">{t('go-back-home')}</Link>
        </Button>
      </div>
    </div>
  );
}
