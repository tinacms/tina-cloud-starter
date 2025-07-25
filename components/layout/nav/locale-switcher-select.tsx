'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { ReactNode, useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onValueChange(nextLocale: string) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  // Extract options from children (option elements)
  const options = Array.isArray(children) ? children : [children];

  return (
    <div className="relative">
      <span className="sr-only">{label}</span>
      <Select
        defaultValue={defaultValue}
        disabled={isPending}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="w-fit text-sm text-muted-foreground border-none shadow-none bg-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => {
            if (option?.props) {
              return (
                <SelectItem key={option.props.value} value={option.props.value}>
                  {option.props.children}
                </SelectItem>
              );
            }
            return null;
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
