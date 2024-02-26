import Link from 'next/link';

import { DateTime } from 'luxon';

import { createTranslation } from '@documenso/lib/i18n/server';
import { getServerComponentSession } from '@documenso/lib/next-auth/get-server-component-session';
import { encryptSecondaryData } from '@documenso/lib/server-only/crypto/encrypt';
import { acceptTeamInvitation } from '@documenso/lib/server-only/team/accept-team-invitation';
import { getTeamById } from '@documenso/lib/server-only/team/get-team';
import { prisma } from '@documenso/prisma';
import { TeamMemberInviteStatus } from '@documenso/prisma/client';
import { Button } from '@documenso/ui/primitives/button';

type AcceptInvitationPageProps = {
  params: {
    token: string;
  };
};

export default async function AcceptInvitationPage({
  params: { token },
}: AcceptInvitationPageProps) {
  const session = await getServerComponentSession();
  const { t } = await createTranslation('web');

  const teamMemberInvite = await prisma.teamMemberInvite.findUnique({
    where: {
      token,
    },
  });

  if (!teamMemberInvite) {
    return (
      <div>
        <h1 className="text-4xl font-semibold">{t('invalid-token')}</h1>

        <p className="text-muted-foreground mb-4 mt-2 text-sm">
          {t('this-token-is-invalid-or-has-expired')}
        </p>

        <Button asChild>
          <Link href="/">{t('return')}</Link>
        </Button>
      </div>
    );
  }

  const team = await getTeamById({ teamId: teamMemberInvite.teamId });

  const user = await prisma.user.findFirst({
    where: {
      email: {
        equals: teamMemberInvite.email,
        mode: 'insensitive',
      },
    },
  });

  // Directly convert the team member invite to a team member if they already have an account.
  if (user) {
    await acceptTeamInvitation({ userId: user.id, teamId: team.id });
  }

  // For users who do not exist yet, set the team invite status to accepted, which is checked during
  // user creation to determine if we should add the user to the team at that time.
  if (!user && teamMemberInvite.status !== TeamMemberInviteStatus.ACCEPTED) {
    await prisma.teamMemberInvite.update({
      where: {
        id: teamMemberInvite.id,
      },
      data: {
        status: TeamMemberInviteStatus.ACCEPTED,
      },
    });
  }

  const email = encryptSecondaryData({
    data: teamMemberInvite.email,
    expiresAt: DateTime.now().plus({ days: 1 }).toMillis(),
  });

  if (!user) {
    return (
      <div>
        <h1 className="text-4xl font-semibold">{t('team-invitation')}</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          {t('you-have-been-invited-by')} <strong>{team.name}</strong> {t('to-join-their-team')}
        </p>

        <p className="text-muted-foreground mb-4 mt-1 text-sm">
          {t('to-accept-this-invitation-you-must-create-an-account')}
        </p>

        <Button asChild>
          <Link href={`/signup?email=${encodeURIComponent(email)}`}>{t('create-account')}</Link>
        </Button>
      </div>
    );
  }

  const isSessionUserTheInvitedUser = user.id === session.user?.id;

  return (
    <div>
      <h1 className="text-4xl font-semibold">{t('invitation-accepted')}</h1>

      <p className="text-muted-foreground mb-4 mt-2 text-sm">
        {t('you-have-accepted-an-invitation-from')} <strong>{team.name}</strong>{' '}
        {t('to-join-their-team')}
      </p>

      {isSessionUserTheInvitedUser ? (
        <Button asChild>
          <Link href="/">{t('continue')}</Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href={`/signin?email=${encodeURIComponent(email)}`}>{t('continue-to-login')}</Link>
        </Button>
      )}
    </div>
  );
}
