import { z } from 'zod';

// Define the Role enum
const RoleEnum = z.enum(['OWNER', 'ADMIN', 'USER', 'MEMBER']);

// Define the schema for creating a new TeamMember
const CreateTeamMemberSchema = z.object({
  teamId: z.string().nonempty(),
  userId: z.number().int(),
  role: RoleEnum.default('MEMBER'),
});

// Define the schema for reading a TeamMember
const ReadTeamMemberSchema = z.object({
  slug: z.string().min(1),
});
// Define the schema for reading all TeamMembers
const ReadAllTeamMemberSchema = z.object({
  slug: z.string().min(1),
});

// Define the schema for updating an existing TeamMember
const UpdateTeamMemberSchema = z.object({
  id: z.string().min(1),
  teamId: z.string().min(1),
  role: RoleEnum.default('MEMBER'),
});

// Define the schema for deleting a TeamMember
const DeleteTeamMemberSchema = z.object({
  id: z.string().min(1),
  teamId: z.string().min(1),
});

export {
  CreateTeamMemberSchema,
  ReadTeamMemberSchema,
  UpdateTeamMemberSchema,
  DeleteTeamMemberSchema,
  ReadAllTeamMemberSchema,
};
