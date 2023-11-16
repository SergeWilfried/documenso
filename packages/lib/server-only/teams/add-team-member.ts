'use server';

import { Role } from '@prisma/client';

import { prisma } from '@documenso/prisma';

export interface addTeamMemberOptions {
  userId: number;
  teamId: string;
  role: Role;
}

export const addTeamMember = async ({ teamId, userId, role }: addTeamMemberOptions) => {
  return await prisma.teamMember.upsert({
    create: {
      teamId,
      userId,
      role,
    },
    update: {
      role,
    },
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  });
};
