import { TRPCError } from '@trpc/server';

import { createTeamMember } from '@documenso/lib/server-only/team-member/create-team-member';
import { deleteTeamMemberFromDatabase } from '@documenso/lib/server-only/team-member/delete-team-member';
import { getTeamMember } from '@documenso/lib/server-only/team-member/get-one-member';
import { getTeamMembers } from '@documenso/lib/server-only/team-member/get-team-member';
import { updateTeamMemberDatabase } from '@documenso/lib/server-only/team-member/update-team-member';

import { authenticatedProcedure, router } from '../trpc';
import {
  CreateTeamMemberSchema,
  DeleteTeamMemberSchema,
  ReadAllTeamMemberSchema,
  ReadTeamMemberSchema,
  UpdateTeamMemberSchema,
} from './schema';

export const teamMemberRouter = router({
  createTeamMember: authenticatedProcedure
    .input(CreateTeamMemberSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { teamId, role } = input;
        const updatedTeamMember = await createTeamMember({
          teamId,
          role,
        });
        return updatedTeamMember;
      } catch (error) {
        console.error(error);

        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Failed to create team member. Please try again later.',
        });
      }
    }),
  update: authenticatedProcedure.input(UpdateTeamMemberSchema).mutation(async ({ input, ctx }) => {
    try {
      const { id, teamId, role } = input;
      const userId = ctx.user.id;
      const updatedTeamMember = await updateTeamMemberDatabase({
        id,
        teamId,
        role,
      });
      return updatedTeamMember;
    } catch (error) {
      console.error(error);

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to update team member. Please try again later.',
      });
    }
  }),
  delete: authenticatedProcedure.input(DeleteTeamMemberSchema).mutation(async ({ input, ctx }) => {
    try {
      const { id, teamId } = input;
      const userId = ctx.user.id;
      await deleteTeamMemberFromDatabase({
        id,
        teamId,
      });
      return true;
    } catch (error) {
      console.error(error);

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to delete team member. Please try again later.',
      });
    }
  }),
  getOne: authenticatedProcedure.input(ReadTeamMemberSchema).query(async ({ input, ctx }) => {
    try {
      const { slug } = input;
      const teamMember = await getTeamMember({ key: { slug } });
      return teamMember;
    } catch (error) {
      console.error(error);

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to get team member. Please try again later.',
      });
    }
  }),
  getAll: authenticatedProcedure.input(ReadAllTeamMemberSchema).query(async ({ input, ctx }) => {
    try {
      const { slug } = input;
      const teamMembers = await getTeamMembers(slug);
      return teamMembers;
    } catch (error) {
      console.error(error);

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Failed to get all team members. Please try again later.',
      });
    }
  }),
});
