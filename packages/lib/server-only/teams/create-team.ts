'use server';

import { Role } from '@prisma/client';

import { prisma } from '@documenso/prisma';

import { addTeamMember } from './add-team-member';

export interface createTeamOptions {
  userId: number;
  slug: string;
  name: string;
}
export const createTeam = async ({ userId, name, slug }: createTeamOptions) => {
  const team = await prisma.team.create({
    data: {
      name,
      slug,
    },
  });

  await addTeamMember({ teamId: team.id, userId: userId, role: Role.ADMIN });

  return team;
};
