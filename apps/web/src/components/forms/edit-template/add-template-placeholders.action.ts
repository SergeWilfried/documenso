'use server';

import { getRequiredServerComponentSession } from '@documenso/lib/next-auth/get-server-session';
import { setRecipientsForTemplate } from '@documenso/lib/server-only/recipient/set-recipients-for-template';
import { TAddTemplatePlaceholderRecipientsFormSchema } from '@documenso/ui/primitives/template-flow/recipients/types';

export type AddTemplatePlaceholdersActionInput = TAddTemplatePlaceholderRecipientsFormSchema & {
  templateId: number;
};

export const addTemplatePlaceholders = async ({
  templateId,
  signers,
}: AddTemplatePlaceholdersActionInput) => {
  'use server';

  const { user } = await getRequiredServerComponentSession();

  await setRecipientsForTemplate({
    userId: user.id,
    templateId,
    recipients: signers.map((signer) => ({
      id: signer.nativeId,
      email: signer.email,
      name: signer.name!,
    })),
  });
};
