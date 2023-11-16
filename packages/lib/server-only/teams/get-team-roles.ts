'use server';

import { prisma } from '@documenso/prisma';

export async function getTeamRoles(userId: number) {
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
