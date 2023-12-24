import { z } from 'zod';

// Define the schema for creating a new Organization
const CreateOrganizationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  domain: z.string().optional(),
  userId: z.number().int(),
});

// Define the schema for reading an Organization
const ReadOrganizationSchema = z.object({
  slug: z.string().min(1),
});

// Define the schema for updating an existing Organization
const UpdateOrganizationSchema = z.object({
  id: z.string().min(1),
  name: z.string().optional(),
  slug: z.string().optional(),
  domain: z.string().optional(),
  userId: z.number().int(),
});

// Define the schema for deleting an Organization
const DeleteOrganizationSchema = z.object({
  id: z.string().min(1),
  userId: z.number().int(),
});

export {
  CreateOrganizationSchema,
  ReadOrganizationSchema,
  UpdateOrganizationSchema,
  DeleteOrganizationSchema,
};
