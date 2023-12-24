'use server';

import { prisma } from '@documenso/prisma';
import type { Role } from '@documenso/prisma/client';

export type UpdateTeamMemberOptions = {
  id: string;
  role: Role;
  teamId: string;
  userId: number;
};

export const updateTeamMemberDatabase = async ({
  id,
  teamId,
  role,
  userId,
}: UpdateTeamMemberOptions) => {
  return await prisma.teamMember.update({
    where: {
      id,
      team: {
        id: teamId,
      },
      user: {
        id: userId,
      },
    },
    data: {
      role,
    },
  });
};
