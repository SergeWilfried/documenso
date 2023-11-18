'use server';

import { prisma } from '@documenso/prisma';

export interface removeTeamMemberOptions {
  userId: number;
  teamId: string;
}

export const removeTeamMember = async ({ teamId, userId }: removeTeamMemberOptions) => {
  return await prisma.teamMember.delete({
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  });
};
