import { z } from '@documenso/lib/i18n/settings';
import { createTranslation } from '@documenso/lib/i18n/server';

const {t} = await createTranslation('common');

export const ZAddSignatureFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: t('email-is-required') })
    .email({ message: t('invalid-email-address') }),
  name: z.string(),
  signature: z.string(),
});

export type TAddSignatureFormSchema = z.infer<typeof ZAddSignatureFormSchema>;
