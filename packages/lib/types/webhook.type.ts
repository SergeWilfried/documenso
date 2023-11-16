export type WebookFormSchema = {
  name: string;
  url: string;
  eventTypes: string[];
};


export type AppEvent =
  | 'invitation.created'
  | 'invitation.removed'
  | 'invitation.fetched'
  | 'member.created'
  | 'member.removed'
  | 'member.left'
  | 'member.fetched'
  | 'member.role.updated'
  | 'user.password.updated'
  | 'user.password.request'
  | 'user.updated'
  | 'user.signup'
  | 'user.password.reset'
  | 'team.fetched'
  | 'team.created'
  | 'team.updated'
  | 'team.removed'
  | 'apikey.created'
  | 'apikey.removed'
  | 'apikey.fetched'
  | 'apikey.removed'
  | 'webhook.created'
  | 'webhook.removed'
  | 'webhook.fetched'
  | 'webhook.updated'
  | 'document.fetched'
  | 'document.created'
  | 'document.updated'
  | 'document.removed'
  | 'signer.fetched'
  | 'signer.created'
  | 'signer.updated'
  | 'signer.removed'
  | '2fa.fetched'
  | '2fa.created'
  | '2fa.updated'
  | '2fa.removed'
  | 'field.fetched'
  | 'field.created'
  | 'field.updated'
  | 'field.removed'
;

