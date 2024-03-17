'use client';

import { useCopyToClipboard } from '@documenso/lib/client-only/hooks/use-copy-to-clipboard';
import { useToast } from '@documenso/ui/primitives/use-toast';
import { useTranslation } from '@documenso/lib/i18n/client';
export type PasswordRevealProps = {
  password: string;
};

export const PasswordReveal = ({ password }: PasswordRevealProps) => {
  const { toast } = useToast();
  const [, copy] = useCopyToClipboard();
  const { t } = useTranslation('marketing');

  const onCopyClick = () => {
    void copy(password).then(() => {
      toast({
        title: t('copied-to-clipboard'),
        description: {t('your-password-has-been-copied-to-your-clipboard')},
      });
    });
  };

  return (
    <button
      type="button"
      className="px-2 blur-sm hover:opacity-50 hover:blur-none"
      onClick={onCopyClick}
    >
      {password}
    </button>
  );
};
