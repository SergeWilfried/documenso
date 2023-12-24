'use server';

import { prisma } from '@documenso/prisma';
import type { Role } from '@documenso/prisma/client';

export type UpdateTeamMemberOptions = {
  id: string;
  role: Role;
  teamId: string;
};

export const updateTeamMemberDatabase = async ({ id, teamId, role }: UpdateTeamMemberOptions) => {
  return await prisma.teamMember.update({
    where: {
      id,
      Team: {
        id: teamId,
      },
    },
    data: {
      role,
    },
  });
};
