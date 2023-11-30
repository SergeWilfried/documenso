'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { useCopyToClipboard } from '@documenso/lib/client-only/hooks/use-copy-to-clipboard';
import { getRecipientType } from '@documenso/lib/client-only/recipient-type';
import { recipientAbbreviation } from '@documenso/lib/utils/recipient-formatter';
import type { Recipient } from '@documenso/prisma/client';
import { useTranslation } from '@documenso/ui/i18n/client';
import { LocaleTypes } from '@documenso/ui/i18n/settings';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { StackAvatar } from './stack-avatar';

export type AvatarWithRecipientProps = {
  recipient: Recipient;
};

export function AvatarWithRecipient({ recipient }: AvatarWithRecipientProps) {
  const [, copy] = useCopyToClipboard();
  const { toast } = useToast();
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, 'dashboard');

  const onRecipientClick = () => {
    void copy(`${process.env.NEXT_PUBLIC_WEBAPP_URL}/sign/${recipient.token}`).then(() => {
      toast({
        title: t(`copied-avatar-to-clipboard`),
        description: t(`sharing-link-has-been-copied`),
      });
    });
  };

  return (
    <div className="my-1 flex cursor-pointer items-center gap-2" onClick={onRecipientClick}>
      <StackAvatar
        first={true}
        key={recipient.id}
        type={getRecipientType(recipient)}
        fallbackText={recipientAbbreviation(recipient)}
      />
      <span
        className="text-muted-foreground text-sm hover:underline"
        title={t(`click-to-copy-link`)}
      >
        {recipient.email}
      </span>
    </div>
  );
}
