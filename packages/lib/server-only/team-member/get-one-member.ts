'use server';

import { prisma } from '@documenso/prisma';

export type GetOneTeamMemberOptions = {
  key: { slug: string };
};

export const getTeamMember = async ({ key: { slug } }: GetOneTeamMemberOptions) => {
  const teamMember = await prisma.teamMember.findFirstOrThrow({
    where: {
      Team: {
        slug,
      },
      role: {
        in: ['ADMIN', 'MEMBER', 'OWNER'],
      },
    },
    include: {
      Team: true,
    },
  });
  return teamMember;
};
