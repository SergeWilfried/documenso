import { Bird, CheckCircle2 } from 'lucide-react';
import { match } from 'ts-pattern';

import { ExtendedDocumentStatus } from '@documenso/prisma/types/extended-document-status';

export type EmptyDocumentProps = { status: ExtendedDocumentStatus };

export const EmptyDocumentState = ({ status }: EmptyDocumentProps) => {
  const {
    title,
    message,
    icon: Icon,
  } = match(status)
    .with(ExtendedDocumentStatus.COMPLETED, () => ({
      title: t('nothing-to-do'),
      message: t('there-are-no-completed-documents'),
      icon: CheckCircle2,
    }))
    .with(ExtendedDocumentStatus.DRAFT, () => ({
      title: t('no-active-drafts'),
      message: t('there-are-no-active-drafts'),
      icon: CheckCircle2,
    }))
    .with(ExtendedDocumentStatus.ALL, () => ({
      title: t('were-all-empty'),
      message: t('you-have-not-yet-created-or-received'),
      icon: Bird,
    }))
    .otherwise(() => ({
      title: t('nothing-to-do'),
      message: t('all-documents-have-been-processed'),
      icon: CheckCircle2,
    }));

  return (
    <div className="text-muted-foreground/60 flex h-60 flex-col items-center justify-center gap-y-4">
      <Icon className="h-12 w-12" strokeWidth={1.5} />

      <div className="text-center">
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="mt-2 max-w-[60ch]">{message}</p>
      </div>
    </div>
  );
};
