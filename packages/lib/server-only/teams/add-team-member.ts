'use server';

import { Role } from '@prisma/client';

import { prisma } from '@documenso/prisma';

export const addTeamMember = async (teamId: string, userId: number, role: Role) => {
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
