import { createTeamMember } from '@documenso/lib/server-only/team-member/create-team-member';
import { deleteTeamMemberFromDatabase } from '@documenso/lib/server-only/team-member/delete-team-member';
import { getTeamMember } from '@documenso/lib/server-only/team-member/get-one-member';
import { getTeamMembers } from '@documenso/lib/server-only/team-member/get-team-member';

import { authenticatedProcedure, router } from '../trpc';
import {
  CreateTeamMemberSchema,
  DeleteTeamMemberSchema,
  ReadAllTeamMemberSchema,
  ReadTeamMemberSchema,
  UpdateTeamMemberSchema,
} from './schema';

export const teamRouter = router({
  createInvitation: authenticatedProcedure
    .input(CreateTeamMemberSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { teamId, role } = input;
        const updatedTeamMember = await createTeamMember({
          userId: Number(ctx.user.id),
          teamId,
          role,
        });
        return updatedTeamMember;
        // Add error handling for createInvitation
      } catch (error) {
        // Handle error for createInvitation
      }
    }),
  update: authenticatedProcedure.input(UpdateTeamMemberSchema).mutation(async ({ input, ctx }) => {
    try {
      const { id, teamId, role } = input;
      const updatedTeamMember = await updateTeamMember({
        key: { userId: ctx.user.id, slug: ctx.team.slug },
        data: { id, teamId, role },
      });
      return updatedTeamMember;
    } catch (error) {
      // Handle error for update
    }
  }),
  delete: authenticatedProcedure.input(DeleteTeamMemberSchema).mutation(async ({ input, ctx }) => {
    try {
      const { id } = input;
      await deleteTeamMemberFromDatabase({
        key: { teamId_userId: { userId: Number(ctx.user.id), 'id' } },
      });
      return true;
    } catch (error) {
      // Handle error for delete
    }
  }),
  getOne: authenticatedProcedure.input(ReadTeamMemberSchema).query(async ({ input, ctx }) => {
    try {
      const { id } = input;
      const teamMember = await getTeamMember({ key: { userId: ctx.user.id, slug: '' } });
      return teamMember;
    } catch (error) {
      // Handle error for getOne
    }
  }),
  getAll: authenticatedProcedure.input(ReadAllTeamMemberSchema).query(async ({ input, ctx }) => {
    try {
      const { slug } = input;
      const teamMembers = await getTeamMembers(slug);
      return teamMembers;
    } catch (error) {
      // Handle error for getAll
    }
  }),
});
