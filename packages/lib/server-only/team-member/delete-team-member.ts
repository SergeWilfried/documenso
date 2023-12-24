'use server';

import { prisma } from '@documenso/prisma';

export type DeleteTeamOptions = {
  teamId: string;
  id: string;
};

export const deleteTeamMemberFromDatabase = async ({ teamId, id }: DeleteTeamOptions) => {
  return await prisma.teamMember.delete({
    where: {
      id,
      Team: {
        id: teamId,
      },
    },
  });
};
