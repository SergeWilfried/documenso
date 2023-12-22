'use server';

import { prisma } from '@documenso/prisma';

export type GetAllTeamMembersOptions = {
  key: { slug: string };
};

export const getTeamMembers = async (slug: string) => {
  return await prisma.teamMember.findMany({
    where: {
      team: {
        slug,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
};
