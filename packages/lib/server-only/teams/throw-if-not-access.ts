'use server';

import { getTeamMember } from './get-team-member';

export interface throwIfNoTeamAccessOptions {
  userId: number;
  slug: string;
}

// Check if the current user has access to the team
// Should be used in API routes to check if the user has access to the team
export const throwIfNoTeamAccess = async ({ userId, slug }: throwIfNoTeamAccessOptions) => {
  if (!userId) {
    throw new Error('Unauthorized');
  }
  const teamMember = await getTeamMember({ userId, slug });

  if (!teamMember) {
    throw new Error('You do not have access to this team');
  }
  /// FIXME
  return {
    ...teamMember,
    user: {},
  };
};
