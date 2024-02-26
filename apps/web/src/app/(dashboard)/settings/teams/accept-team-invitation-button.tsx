'use client';

import { useTranslation } from '@documenso/lib/i18n/client';
import { trpc } from '@documenso/trpc/react';
import { Button } from '@documenso/ui/primitives/button';
import { useToast } from '@documenso/ui/primitives/use-toast';

export type AcceptTeamInvitationButtonProps = {
  teamId: number;
};

export const AcceptTeamInvitationButton = ({ teamId }: AcceptTeamInvitationButtonProps) => {
  const { toast } = useToast();
  const { t } = useTranslation('web');
  const {
    mutateAsync: acceptTeamInvitation,
    isLoading,
    isSuccess,
  } = trpc.team.acceptTeamInvitation.useMutation({
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('accepted-team-invitation'),
        duration: 5000,
      });
    },
    onError: () => {
      toast({
        title: t('something-went-wrong'),
        variant: 'destructive',
        duration: 10000,
        description: t('unable-to-join-this-team-at-this-time'),
      });
    },
  });

  return (
    <Button
      onClick={async () => acceptTeamInvitation({ teamId })}
      loading={isLoading}
      disabled={isLoading || isSuccess}
    >
      {t('accept')}
    </Button>
  );
};
