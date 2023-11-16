'use server';

import { prisma } from '@documenso/prisma';

// Get the current user's team member object
export const getTeamMember = async (userId: number, slug: string) => {
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
