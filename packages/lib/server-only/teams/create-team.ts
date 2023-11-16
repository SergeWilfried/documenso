'use server';

import { Role } from '@prisma/client';

import { prisma } from '@documenso/prisma';

import { addTeamMember } from './add-team-member';

export const createTeam = async (param: { userId: number; name: string; slug: string }) => {
  const { userId, name, slug } = param;

  const team = await prisma.team.create({
    data: {
      name,
      slug,
    },
  });

  await addTeamMember(team.id, userId, Role.ADMIN);

  return team;
};
