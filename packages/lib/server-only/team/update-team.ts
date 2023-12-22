'use server';

import { prisma } from '@documenso/prisma';

export type UpdateTeamOptions = {
  id: string;
  name?: string;
  slug?: string;
  domain?: string;
};

export const updateTeamInDatabase = async ({ id, name, slug, domain }: UpdateTeamOptions) => {
  return await prisma.team.update({
    where: { id },
    data: {
      name,
      slug,
      domain,
    },
  });
};
