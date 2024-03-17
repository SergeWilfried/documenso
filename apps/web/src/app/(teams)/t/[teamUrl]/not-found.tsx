'use client';

import Link from 'next/link';

import { ChevronLeft } from 'lucide-react';

import { useTranslation } from '@documenso/lib/i18n/client';
import { Button } from '@documenso/ui/primitives/button';

export default function NotFound() {
  const { t } = useTranslation('web');
  return (
    <div className="mx-auto flex min-h-[80vh] w-full items-center justify-center py-32">
      <div>
        <p className="text-muted-foreground font-semibold">{t('404-team-not-found')}</p>

        <h1 className="mt-3 text-2xl font-bold md:text-3xl">{t('oops-something-went-wrong')}</h1>

        <p className="text-muted-foreground mt-4 text-sm">
          {t('the-team-you-are-looking-for-may-have-been-removed')}
        </p>

        <div className="mt-6 flex gap-x-2.5 gap-y-4 md:items-center">
          <Button asChild className="w-32">
            <Link href="/settings/teams">
              <ChevronLeft className="mr-2 h-4 w-4" />
              {t('go-back')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
