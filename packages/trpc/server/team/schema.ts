import { z } from 'zod';

export const ZCreateTeamMutationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  domain: z.string().url().optional(),
  defaultRole: z.enum(['ADMIN', 'USER']),
});

export const ZUpdateTeamMutationSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  domain: z.string().url().optional(),
  defaultRole: z.enum(['ADMIN', 'USER']),
});

export const ZDeleteTeamMutationSchema = z.object({
  id: z.string().min(1),
});

export const ZGetTeamQuerySchema = z.object({
  slug: z.string().min(1),
});
export type TCreateTeamMutationSchema = z.infer<typeof ZCreateTeamMutationSchema>;
export type TUpdateTeamMutationSchema = z.infer<typeof ZUpdateTeamMutationSchema>;
export type TDeleteTeamMutationSchema = z.infer<typeof ZDeleteTeamMutationSchema>;
export type ZGetTeamQuerySchema = z.infer<typeof ZGetTeamQuerySchema>;
