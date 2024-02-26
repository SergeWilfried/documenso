'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ChevronLeft } from 'lucide-react';

import { AppErrorCode } from '@documenso/lib/errors/app-error';
import { useTranslation } from '@documenso/lib/i18n/client';
import { Button } from '@documenso/ui/primitives/button';

type ErrorProps = {
  error: Error & { digest?: string };
};

export default function ErrorPage({ error }: ErrorProps) {
  const { t } = useTranslation('web');
  const router = useRouter();

  let errorMessage = t('unknown-error');
  let errorDetails = '';

  if (error.message === AppErrorCode.UNAUTHORIZED) {
    errorMessage = t('unauthorized');
    errorDetails = t('you-are-not-authorized-to-view-this-page');
  }

  return (
    <div className="mx-auto flex min-h-[80vh] w-full items-center justify-center py-32">
      <div>
        <p className="text-muted-foreground font-semibold">{errorMessage}</p>

        <h1 className="mt-3 text-2xl font-bold md:text-3xl">{t('oops-something-went-wrong')}</h1>

        <p className="text-muted-foreground mt-4 text-sm">{errorDetails}</p>

        <div className="mt-6 flex gap-x-2.5 gap-y-4 md:items-center">
          <Button
            variant="ghost"
            className="w-32"
            onClick={() => {
              void router.back();
            }}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t('go-back')}
          </Button>

          <Button asChild>
            <Link href="/settings/teams">{t('view-teams')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
