'use server';

import { prisma } from '@documenso/prisma';

export type DeleteTeamOptions = {
  key: {
    teamId_userId: {
      teamId: string;
      userId: number;
    };
  };
};

export const deleteTeamMemberFromDatabase = async ({ key }: DeleteTeamOptions) => {
  return await prisma.teamMember.delete({
    where: key,
  });
};
