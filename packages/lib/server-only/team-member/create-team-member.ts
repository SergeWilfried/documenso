'use server';

import { prisma } from '@documenso/prisma';
import type { Role } from '@documenso/prisma/client';

export type CreateTeamMemberOptions = {
  teamId: string;
  userId: number;
  role: Role;
};

export const createTeamMember = async ({ teamId, userId, role }: CreateTeamMemberOptions) => {
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
