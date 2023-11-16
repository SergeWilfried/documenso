'use server';

import { prisma } from '@documenso/prisma';

export const removeTeamMember = async (teamId: string, userId: number) => {
  return await prisma.teamMember.delete({
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  });
};
