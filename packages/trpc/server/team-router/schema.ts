import z from 'zod';

import { Role } from '@documenso/prisma/client';

export const ZUpdateTeamMutationSchema = z.object({
  id: z.number().min(1),
  slug: z.string().optional(),
  name: z.string().optional(),
});

export type TUpdateTeamMutationSchema = z.infer<typeof ZUpdateTeamMutationSchema>;

export const ZCreateTeamMutationSchema = z.object({
  userId: z.number().min(1),
  slug: z.string(),
  name: z.string(),
});

export type TCreateTeamMutationSchema = z.infer<typeof ZCreateTeamMutationSchema>;

export const ZDeleteTeamMutationSchema = z.object({
  id: z.number().min(1),
  slug: z.string(),
});

export type TDeleteTeamMutationSchema = z.infer<typeof ZDeleteTeamMutationSchema>;

export const ZGetTeamByIdQuerySchema = z.object({
  id: z.number().min(1),
});

export type TGetTeamByIdQuerySchema = z.infer<typeof ZGetTeamByIdQuerySchema>;

export const ZCreateTeamMemberMutationSchema = z.object({
  teamId: z.number().min(1),
  memberId: z.number().min(1),
});

export type TCreateTeamMemberMutationSchema = z.infer<typeof ZCreateTeamMemberMutationSchema>;

export const ZUpdateTeamMemberMutationSchema = z.object({
  id: z.number().min(1),
  teamId: z.number().min(1),
  memberId: z.number().min(1),
});

export type TUpdateTeamMemberMutationSchema = z.infer<typeof ZUpdateTeamMemberMutationSchema>;

export const ZDeleteTeamMemberMutationSchema = z.object({
  userId: z.number().min(1),
  teamId: z.string(),
});

export type TDeleteTeamMemberMutationSchema = z.infer<typeof ZDeleteTeamMemberMutationSchema>;

export const ZGetTeamMemberByIdQuerySchema = z.object({
  userId: z.number().min(1),
  slug: z.string(),
});

export type TGetTeamMemberByIdQuerySchema = z.infer<typeof ZGetTeamMemberByIdQuerySchema>;

export const ZGetTeamsQuerySchema = z.object({
  userId: z.number().min(1),
});

export type TGetTeamsQuerySchema = z.infer<typeof ZGetTeamsQuerySchema>;

export const ZGetTeamMembersQuerySchema = z.object({
  slug: z.string(),
});

export type TGetTeamMembersQuerySchema = z.infer<typeof ZGetTeamMembersQuerySchema>;

export const ZGetTeamRolesQuerySchema = z.object({
  teamId: z.number().min(1),
});

export type TGetTeamRolesQuerySchema = z.infer<typeof ZGetTeamRolesQuerySchema>;

export const ZAddTeamMemberMutationSchema = z.object({
  teamId: z.number().min(1),
  userId: z.number().min(1),
  roles: z.array(z.nativeEnum(Role)).optional(),
});

export type TAddTeamMemberMutationSchema = z.infer<typeof ZAddTeamMemberMutationSchema>;
