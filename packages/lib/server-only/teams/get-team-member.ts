'use server';

import { prisma } from '@documenso/prisma';

export interface getTeamMemberOptions {
  userId: number;
  slug: string;
}
// Get the current user's team member object
export const getTeamMember = async ({ userId, slug }: getTeamMemberOptions) => {
  const teamMember = await prisma.teamMember.findFirstOrThrow({
    where: {
      userId,
      team: {
        slug,
      },
      role: {
        in: ['ADMIN', 'USER', 'OWNER'],
      },
    },
    include: {
      team: true,
    },
  });

  return teamMember;
};
