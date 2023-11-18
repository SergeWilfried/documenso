'use server';

import { prisma } from '@documenso/prisma';

export interface getTeamMembersOptions {
  slug: string;
}

export const getTeamMembers = async ({ slug }: getTeamMembersOptions) => {
  return await prisma.teamMember.findMany({
    where: {
      team: {
        slug,
      },
    },
    include: {
      user: true,
    },
  });
};
