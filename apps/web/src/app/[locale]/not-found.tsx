import Link from 'next/link';

import { getServerComponentSession } from '@documenso/lib/next-auth/get-server-session';
import { createTranslation } from '@documenso/ui/i18n/server';

import { Button } from '@documenso/ui/primitives/button';

import NotFoundPartial from '~/components/partials/not-found';

export default async function NotFound() {
  const { session } = await getServerComponentSession();
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions

  const { t } = await createTranslation('fr', 'not-found');

  return (
    <NotFoundPartial>
      {session && (
        <Button className="w-32" asChild>
          <Link href="/fr/documents">{t(`documents`)}</Link>
        </Button>
      )}

      {!session && (
        <Button className="w-32" asChild>
          <Link href="/fr/signin">{t(`sign-in`)}</Link>
        </Button>
      )}
    </NotFoundPartial>
  );
}
