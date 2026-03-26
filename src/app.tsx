import React from 'react';
import { LocaleProvider } from './i18n';

export function rootContainer(container: React.ReactNode) {
  return <LocaleProvider>{container}</LocaleProvider>;
}
