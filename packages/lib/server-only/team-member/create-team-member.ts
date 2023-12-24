'use server';

import { prisma } from '@documenso/prisma';
import type { Role } from '@documenso/prisma/client';

export type CreateTeamMemberOptions = {
  teamId: string;
  role: Role;
};

export const createTeamMember = async ({ teamId, role }: CreateTeamMemberOptions) => {
  return await prisma.teamMember.upsert({
    create: {
      teamId,
      role,
    },
    update: {
      role,
    },
    where: {
      teamId,
    },
  });
};
