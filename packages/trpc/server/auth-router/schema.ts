import { z } from '@documenso/lib/i18n/settings';
import { createTranslation } from '@documenso/lib/i18n/server';

const {t} = await createTranslation('common');
export const ZCurrentPasswordSchema = z
  .string()
  .min(6, { message: t('must-be-at-least-6-characters-in-length') })
  .max(72);

export const ZPasswordSchema = z
  .string()
  .regex(new RegExp('.*[A-Z].*'), { message: t('one-uppercase-character') })
  .regex(new RegExp('.*[a-z].*'), { message: t('one-lowercase-character') })
  .regex(new RegExp('.*\\d.*'), { message: t('one-number') })
  .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), {
    message: t('one-special-character-is-required'),
  })
  .min(8, { message: t('must-be-at-least-8-characters-in-length') })
  .max(72, { message: t('cannot-be-more-than-72-characters-in-length') });

export const ZSignUpMutationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: ZPasswordSchema,
  signature: z.string().min(1, { message: t('a-signature-is-required') }),
});

export type TSignUpMutationSchema = z.infer<typeof ZSignUpMutationSchema>;

export const ZVerifyPasswordMutationSchema = ZSignUpMutationSchema.pick({ password: true });
