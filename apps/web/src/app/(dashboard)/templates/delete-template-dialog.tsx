import { useRouter } from 'next/navigation';

import { createTranslation } from '@documenso/lib/i18n/server';
import { trpc as trpcReact } from '@documenso/trpc/react';
import { Button } from '@documenso/ui/primitives/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@documenso/ui/primitives/dialog';
import { useToast } from '@documenso/ui/primitives/use-toast';

type DeleteTemplateDialogProps = {
  id: number;
  open: boolean;
  onOpenChange: (_open: boolean) => void;
};

export const DeleteTemplateDialog = async ({
  id,
  open,
  onOpenChange,
}: DeleteTemplateDialogProps) => {
  const router = useRouter();
  const { t } = await createTranslation('web');
  const { toast } = useToast();

  const { mutateAsync: deleteTemplate, isLoading } = trpcReact.template.deleteTemplate.useMutation({
    onSuccess: () => {
      router.refresh();

      toast({
        title: t('template-deleted'),
        description: t('your-template-has-been-successfully-deleted'),
        duration: 5000,
      });

      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: t('something-went-wrong'),
        description: t('this-template-could-not-be-deleted-at-this-time-please-try-again'),
        variant: 'destructive',
        duration: 7500,
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={(value) => !isLoading && onOpenChange(value)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('do-you-want-to-delete-this-template')}</DialogTitle>

          <DialogDescription>{t('please-note-that-this-action-is-irreversible')}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            disabled={isLoading}
            onClick={() => onOpenChange(false)}
          >
            {t('cancel')}
          </Button>

          <Button type="button" loading={isLoading} onClick={async () => deleteTemplate({ id })}>
            {t('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
