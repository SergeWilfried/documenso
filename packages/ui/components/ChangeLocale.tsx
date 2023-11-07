'use client';

import React from 'react';

import { useParams, useRouter, useSelectedLayoutSegments } from 'next/navigation';

import { LocaleTypes } from '../i18n/settings';

const ChangeLocale = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const locale = useParams()?.locale as LocaleTypes;
  const urlSegments = useSelectedLayoutSegments();

  const handleLocaleChange = (event: { target: { value: string } }) => {
    const newLocale = event.target.value;

    // This is used by the Header component which is used in `app/[locale]/layout.tsx` file,
    // urlSegments will contain the segments after the locale.
    // We replace the URL with the new locale and the rest of the segments.
    router.push(`/${newLocale}/${urlSegments.join('/')}`);
  };

  return (
    <div>
      <select onChange={handleLocaleChange} value={locale}>
        <option value="en">🇺🇸</option>
        <option value="fr">🇫🇷</option>
        <option value="sv">🇸🇪</option>
      </select>
    </div>
  );
};

export default ChangeLocale;
