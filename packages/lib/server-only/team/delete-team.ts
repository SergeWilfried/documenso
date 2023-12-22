'use server';

import { prisma } from '@documenso/prisma';

export type DeleteTeamByIdOptions = {
  id: string;
};
export type DeleteTeamWithNameOptions = {
  name: string;
};

export type DeleteTeamWithSlugOptions = {
  slug: string;
};

export const deleteTeamFromDatabase = async ({ id }: DeleteTeamByIdOptions) => {
  return await prisma.team.delete({
    where: {
      id,
    },
  });
};

export const deleteTeamWithName = async ({ name }: DeleteTeamWithNameOptions) => {
  return await prisma.team.delete({
    where: {
      name,
    },
  });
};

export const deleteTeamWithSlug = async ({ slug }: DeleteTeamWithSlugOptions) => {
  return await prisma.team.delete({
    where: {
      slug,
    },
  });
};
