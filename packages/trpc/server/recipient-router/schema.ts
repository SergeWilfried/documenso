import { z } from 'zod';

export const ZAddSignersMutationSchema = z
  .object({
    documentId: z.number(),
    signers: z.array(
      z.object({
        nativeId: z.number().optional(),
        email: z.string().email().optional(),
        phoneNumber: z.string().optional(),
        name: z.string(),
      }).superRefine(({ email, phoneNumber }, refinementContext) => {
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
    ),
  })
  .refine(
    (schema) => {
      const emails = schema.signers.map((signer) => {
        if(signer.email){
          return signer.email.toLowerCase()
        }
      });
      return new Set(emails).size === emails.length;
    },
    // Dirty hack to handle errors when .root is populated for an array type
    { message: 'Signers must have unique emails', path: ['signers__root'] },
  );

export type TAddSignersMutationSchema = z.infer<typeof ZAddSignersMutationSchema>;

export const ZAddTemplateSignersMutationSchema = z
  .object({
    templateId: z.number(),
    signers: z.array(
      z.object({
        nativeId: z.number().optional(),
        email: z.string().email().optional(),
        phoneNumber: z.string().optional(),
        name: z.string(),
      }).superRefine(({ email, phoneNumber }, refinementContext) => {
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
    ),
  })
  .refine(
    (schema) => {
      const emails = schema.signers.map((signer) => {
        if(signer.email){
          return signer.email.toLowerCase()
        }
      });

      return new Set(emails).size === emails.length;
    },
    // Dirty hack to handle errors when .root is populated for an array type
    { message: 'Signers must have unique emails', path: ['signers__root'] },
  );

export type TAddTemplateSignersMutationSchema = z.infer<typeof ZAddTemplateSignersMutationSchema>;

export const ZCompleteDocumentWithTokenMutationSchema = z.object({
  token: z.string(),
  documentId: z.number(),
});

export type TCompleteDocumentWithTokenMutationSchema = z.infer<
  typeof ZCompleteDocumentWithTokenMutationSchema
>;
