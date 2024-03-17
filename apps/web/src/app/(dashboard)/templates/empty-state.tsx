import { Bird } from 'lucide-react';

import { createTranslation } from '@documenso/lib/i18n/server';

export const EmptyTemplateState = async () => {
  const { t } = await createTranslation('web');

  return (
    <div className="text-muted-foreground/60 flex h-96 flex-col items-center justify-center gap-y-4">
      <Bird className="h-12 w-12" strokeWidth={1.5} />

      <div className="text-center">
        <h3 className="text-lg font-semibold">{t('were-all-empty')}</h3>

        <p className="mt-2 max-w-[50ch]">
          {t('you-have-not-yet-created-any-templates-to-create-a-template-please-upload-one')}
        </p>
      </div>
    </div>
  );
};
