import { z } from 'zod';

import { DocumentDataType, FieldType } from '@documenso/prisma/client';

export const ZCreateSinglePlayerDocumentMutationSchema = z.object({
  documentData: z.object({
    data: z.string(),
    type: z.nativeEnum(DocumentDataType),
  }),
  documentName: z.string(),
  signer: z.object({
    name: z.string(),
    // Keeping both email and phone optional on base schema and validating values inside `superRefine`
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    signature: z.string(),
  })  // Perform conditional validation to ensure either a valid email or phone number is provided.
  .superRefine(({ email, phoneNumber }, refinementContext) => {
    if (email === '' && phoneNumber !== '' && !z.string().parse(phoneNumber ?? '')) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid phone number',
        path: ['phone'],
      });
    }

    if (email !== '' && phoneNumber === '' && !z.string().email().parse(email ?? '')) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid email',
        path: ['email'],
      });
    }
  }),
  fields: z.array(
    z.object({
      page: z.number(),
      type: z.nativeEnum(FieldType),
      positionX: z.number(),
      positionY: z.number(),
      width: z.number(),
      height: z.number(),
    }),
  ),
});

export type TCreateSinglePlayerDocumentMutationSchema = z.infer<
  typeof ZCreateSinglePlayerDocumentMutationSchema
>;
