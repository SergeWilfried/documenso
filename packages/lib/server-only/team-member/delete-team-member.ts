'use server';

import { prisma } from '@documenso/prisma';

export type DeleteTeamOptions = {
  userId: number;
  teamId: string;
  id: string;
};

export const deleteTeamMemberFromDatabase = async ({ userId, teamId, id }: DeleteTeamOptions) => {
  return await prisma.teamMember.delete({
    where: {
      id,
      team: {
        id: teamId,
      },
      user: {
        id: userId,
      },
    },
  });
};
