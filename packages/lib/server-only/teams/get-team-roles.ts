'use server';

import { prisma } from '@documenso/prisma';

export interface getTeamMembersOptions {
  userId: number;
}
export async function getTeamRoles({ userId }: getTeamMembersOptions) {
  const teamRoles = await prisma.teamMember.findMany({
    where: {
      userId,
    },
    select: {
      teamId: true,
      role: true,
    },
  });

  return teamRoles;
}
