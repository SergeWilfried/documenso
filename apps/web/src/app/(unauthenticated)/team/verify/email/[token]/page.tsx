import Link from 'next/link';

import { createTranslation } from '@documenso/lib/i18n/server';
import { isTokenExpired } from '@documenso/lib/utils/token-verification';
import { prisma } from '@documenso/prisma';
import { Button } from '@documenso/ui/primitives/button';

type VerifyTeamEmailPageProps = {
  params: {
    token: string;
  };
};

export default async function VerifyTeamEmailPage({ params: { token } }: VerifyTeamEmailPageProps) {
  const { t } = await createTranslation('web');

  const teamEmailVerification = await prisma.teamEmailVerification.findUnique({
    where: {
      token,
    },
    include: {
      team: true,
    },
  });

  if (!teamEmailVerification || isTokenExpired(teamEmailVerification.expiresAt)) {
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

  const { team } = teamEmailVerification;

  let isTeamEmailVerificationError = false;

  try {
    await prisma.$transaction([
      prisma.teamEmailVerification.deleteMany({
        where: {
          teamId: team.id,
        },
      }),
      prisma.teamEmail.create({
        data: {
          teamId: team.id,
          email: teamEmailVerification.email,
          name: teamEmailVerification.name,
        },
      }),
    ]);
  } catch (e) {
    console.error(e);
    isTeamEmailVerificationError = true;
  }

  if (isTeamEmailVerificationError) {
    return (
      <div>
        <h1 className="text-4xl font-semibold">{t('team-email-verification')}</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          {t('something-went-wrong-while-attempting')} <strong>{team.name}</strong>
          {t('please-try-again-later')}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold">{t('team-email-verified')}</h1>

      <p className="text-muted-foreground mb-4 mt-2 text-sm">
        {t('you-have-verified-your-email-address-for')} <strong>{team.name}</strong>.
      </p>

      <Button asChild>
        <Link href="/">{t('continue')}</Link>
      </Button>
    </div>
  );
}
