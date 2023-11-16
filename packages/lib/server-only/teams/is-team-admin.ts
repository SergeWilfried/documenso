'use server';

import { prisma } from '@documenso/prisma';
import { Role } from '@documenso/prisma/client';

// Check if the user is an admin or owner of the team
export async function isTeamAdmin(userId: number, teamId: string) {
  const teamMember = await prisma.teamMember.findFirstOrThrow({
    where: {
      userId,
      teamId,
    },
  });

  return teamMember.role === Role.ADMIN || teamMember.role === Role.OWNER;
}
