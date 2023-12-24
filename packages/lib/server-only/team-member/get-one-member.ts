'use server';

import { prisma } from '@documenso/prisma';

export type GetOneTeamMemberOptions = {
  key: { userId: number; slug: string };
};

export const getTeamMember = async ({ key: { userId, slug } }: GetOneTeamMemberOptions) => {
  const teamMember = await prisma.teamMember.findFirstOrThrow({
    where: {
      userId,
      team: {
        slug,
      },
      role: {
        in: ['ADMIN', 'MEMBER', 'OWNER'],
      },
    },
    include: {
      team: true,
    },
  });
  return teamMember;
};
