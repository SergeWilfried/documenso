import { z } from 'zod';

export const ZCreateInvitationMutationSchema = z.object({
  teamId: z.string(),
  email: z.string(),
  role: z.enum(['OWNER', 'ADMIN', 'USER', 'MEMBER']),
  token: z.string(),
  expires: z.string(), // Assuming DateTime is represented as a string
});

export const ZUpdateInvitationMutationSchema = z.object({
  teamId: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(['OWNER', 'ADMIN', 'USER', 'MEMBER']).optional(),
  token: z.string().optional(),
  expires: z.string().optional(), // Assuming DateTime is represented as a string
});

export const ZGetOrDeleteInvitationMutationSchema = z.object({
  id: z.string(),
});

export type ZCreateInvitationMutationSchema = z.infer<typeof ZCreateInvitationMutationSchema>;
export type ZUpdateInvitationMutationSchema = z.infer<typeof ZUpdateInvitationMutationSchema>;
export type ZGetOrDeleteInvitationMutationSchema = z.infer<
  typeof ZGetOrDeleteInvitationMutationSchema
>;
