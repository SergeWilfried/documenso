'use server';

import { prisma } from '@documenso/prisma';
import { Team } from '@documenso/prisma/client';

export const updateTeam = async (slug: string, data: Partial<Team>) => {
  return await prisma.team.update({
    where: {
      slug,
    },
    data: data,
  });
};
