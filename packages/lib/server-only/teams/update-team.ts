'use server';

import { prisma } from '@documenso/prisma';
import { Team } from '@documenso/prisma/client';

export interface updateTeamOptions {
  data: Partial<Team>;
  slug: string;
}

export const updateTeam = async ({ slug, data }: updateTeamOptions) => {
  return await prisma.team.update({
    where: {
      slug,
    },
    data: data,
  });
};
