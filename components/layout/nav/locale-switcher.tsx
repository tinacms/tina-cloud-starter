import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import LocaleSwitcherSelect from './locale-switcher-select';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label={t('label')}
      options={routing.locales.map((locale) => ({
        key: locale,
        value: locale,
        label: t('locale', { locale: locale }),
      }))}
    ></LocaleSwitcherSelect>
  );
}
