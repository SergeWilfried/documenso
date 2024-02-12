'use client';

import React from 'react';

import { switchLocaleAction } from '@documenso/ee/server-only/limits/provider/switch-locale';

import { useTranslation } from '../../i18n/client';

export default function ChangeLocale() {
  const { i18n, t } = useTranslation('common');
  // You can also use our custom hook instead of `i18n.resolvedLanguage`
  // const locale = useLocale();

  return (
    <div>
      <select onChange={(e) => switchLocaleAction(e.target.value)} value={i18n.resolvedLanguage}>
        <option value="en">🇺🇸 {t('english')}</option>
        <option value="zh-CN">🇨🇳 {t('chinese')}</option>
        <option value="sv">🇸🇪 {t('swedish')}</option>
      </select>
    </div>
  );
}
