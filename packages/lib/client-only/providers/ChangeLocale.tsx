'use client';

import React from 'react';

import { switchLocaleAction } from '@documenso/ee/server-only/limits/provider/switch-locale';

import type { Locales } from '../../i18n/settings';

export default function ChangeLocale(locale: Locales) {
  const handleLocaleChange = (event: { target: { value: string } }) => {
    switchLocaleAction(event.target.value);
  };

  return (
    <div>
      <select onChange={handleLocaleChange} value={locale}>
        <option value="en">🇺🇸 English</option>
        <option value="zh-CN">🇨🇳 Chinese</option>
        <option value="sv">🇸🇪 Swedish</option>
      </select>
    </div>
  );
}
