export type AuditLogsEventType =
  | 'user.session.activity' // Monitors and logs activities performed by a user within a specific session.
  | 'document.view' // Tracks when a document is opened or viewed by a user.
  | 'document.sign' // Records when a document is digitally signed by a user or party.
  | 'document.download' // Logs when a document is downloaded or exported from the system.
  | 'document.edit' // Tracks modifications made to the content of a document.
  | 'document.share' // Records instances where a document is shared with other users or parties.

  | 'user.login' // Records when a user successfully logs into the system.
  | 'user.account.change' // Records changes made to user profiles, such as email or role modifications.
  | 'user.logout' // Records when a user logs out of the system.
  | 'user.permission.change' // Logs changes in user permissions for document access or editing rights.
  | 'audit-log.access' // Monitors when the audit log itself is accessed or viewed by users.
  | 'system.config.change' // Tracks changes in system settings related to document signing or security measures.
  | 'error.warning' // Captures system errors, warnings, or failed actions related to document signing.
  | 'api.request' // Logs API requests made to the system for document-related actions.
  | 'document.timestamp.change' // Tracks alterations made to document timestamps (creation, modification, signing).
  | 'document.create' // Logs the creation of a new document in the system.
  | 'document.archive' // Logs when documents are archived or removed from the system.
  | 'authentication.attempt'; // Records both successful and failed attempts to authenticate into the system.
