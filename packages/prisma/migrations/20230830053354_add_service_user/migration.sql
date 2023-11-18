INSERT INTO "User" ("email", "name") VALUES (
  'serviceaccount@progiciel.co',
  'Service Account'
) ON CONFLICT DO NOTHING;
