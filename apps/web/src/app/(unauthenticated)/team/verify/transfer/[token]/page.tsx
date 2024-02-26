import Link from 'next/link';

import { createTranslation } from '@documenso/lib/i18n/server';
import { transferTeamOwnership } from '@documenso/lib/server-only/team/transfer-team-ownership';
import { isTokenExpired } from '@documenso/lib/utils/token-verification';
import { prisma } from '@documenso/prisma';
import { Button } from '@documenso/ui/primitives/button';

type VerifyTeamTransferPage = {
  params: {
    token: string;
  };
};

export default async function VerifyTeamTransferPage({
  params: { token },
}: VerifyTeamTransferPage) {
  const { t } = await createTranslation('web');

  const teamTransferVerification = await prisma.teamTransferVerification.findUnique({
    where: {
      token,
    },
    include: {
      team: true,
    },
  });

  if (!teamTransferVerification || isTokenExpired(teamTransferVerification.expiresAt)) {
    return (
      <div>
        <h1 className="text-4xl font-semibold">{t('invalid-link')}</h1>

        <p className="text-muted-foreground mb-4 mt-2 text-sm">
          {t('this-link-is-invalid-or-has-expired')}
        </p>

        <Button asChild>
          <Link href="/">{t('return')}</Link>
        </Button>
      </div>
    );
  }

  const { team } = teamTransferVerification;

  let isTransferError = false;

  try {
    await transferTeamOwnership({ token });
  } catch (e) {
    console.error(e);
    isTransferError = true;
  }

  if (isTransferError) {
    return (
      <div>
        <h1 className="text-4xl font-semibold">{t('team-ownership-transfer')}</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          {t('something-went-wrong-while')} <strong>{team.name}</strong>{' '}
          {t('to-your-please-try-again-later-or-contact-support')}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold">{t('team-ownership-transferred')}</h1>

      <p className="text-muted-foreground mb-4 mt-2 text-sm">
        {t('the-ownership-of-team')} <strong>{team.name}</strong>{' '}
        {t('has-been-successfully-transferred-to-you')}
      </p>

      <Button asChild>
        <Link href={`/t/${team.url}/settings`}>{t('continue')}</Link>
      </Button>
    </div>
  );
}
