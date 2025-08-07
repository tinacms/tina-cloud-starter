'use client';

import * as BoxIcons from 'react-icons/bi';
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { AiFillInstagram } from 'react-icons/ai';
import React from 'react';
import { useLayout } from './layout/layout-context';
import { Maybe } from '@/tina/__generated__/types';

export const IconOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Tina: (props: any) => (
    <svg {...props} viewBox='0 0 66 80' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <title>Tina</title>
      <path
        d='M39.4615 36.1782C42.763 33.4475 44.2259 17.3098 45.6551 11.5091C47.0843 5.70828 52.995 6.0025 52.995 6.0025C52.995 6.0025 51.4605 8.67299 52.0864 10.6658C52.7123 12.6587 57 14.4401 57 14.4401L56.0752 16.8781C56.0752 16.8781 54.1441 16.631 52.995 18.9297C51.8459 21.2283 53.7336 43.9882 53.7336 43.9882C53.7336 43.9882 46.8271 57.6106 46.8271 63.3621C46.8271 69.1136 49.5495 73.9338 49.5495 73.9338H45.7293C45.7293 73.9338 40.1252 67.2648 38.9759 63.9318C37.8266 60.5988 38.2861 57.2658 38.2861 57.2658C38.2861 57.2658 32.1946 56.921 26.7931 57.2658C21.3915 57.6106 17.7892 62.2539 17.1391 64.8512C16.4889 67.4486 16.2196 73.9338 16.2196 73.9338H13.1991C11.3606 68.2603 9.90043 66.2269 10.6925 63.3621C12.8866 55.4269 12.4557 50.9263 11.9476 48.9217C11.4396 46.9172 8 45.1676 8 45.1676C9.68492 41.7349 11.4048 40.0854 18.8029 39.9133C26.201 39.7413 36.1599 38.9088 39.4615 36.1782Z'
        fill='currentColor'
      />
      <path
        d='M20.25 63.03C20.25 63.03 21.0305 70.2533 25.1773 73.9342H28.7309C25.1773 69.9085 24.7897 59.415 24.7897 59.415C22.9822 60.0035 20.4799 62.1106 20.25 63.03Z'
        fill='currentColor'
      />
    </svg>
  ),
  ...BoxIcons,
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  AiFillInstagram,
};

// TODO: Define types inside of the backend (tina folder)
// Define valid types for better type safety
type IconSize = 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'custom';
type IconStyle = 'regular' | 'circle';
type IconColor =
  | 'blue'
  | 'teal'
  | 'green'
  | 'red'
  | 'pink'
  | 'purple'
  | 'orange'
  | 'yellow'
  | 'black'
  | 'white';

const iconColorClass: Record<IconColor, { regular: string; circle: string }> = {
  blue: {
    regular: 'text-blue-400',
    circle: 'bg-blue-400 dark:bg-blue-500 text-blue-50',
  },
  teal: {
    regular: 'text-teal-400',
    circle: 'bg-teal-400 dark:bg-teal-500 text-teal-50',
  },
  green: {
    regular: 'text-green-400',
    circle: 'bg-green-400 dark:bg-green-500 text-green-50',
  },
  red: {
    regular: 'text-red-400',
    circle: 'bg-red-400 dark:bg-red-500 text-red-50',
  },
  pink: {
    regular: 'text-pink-400',
    circle: 'bg-pink-400 dark:bg-pink-500 text-pink-50',
  },
  purple: {
    regular: 'text-purple-400',
    circle: 'bg-purple-400 dark:bg-purple-500 text-purple-50',
  },
  orange: {
    regular: 'text-orange-400',
    circle: 'bg-orange-400 dark:bg-orange-500 text-orange-50',
  },
  yellow: {
    regular: 'text-yellow-400',
    circle: 'bg-yellow-400 dark:bg-yellow-500 text-yellow-50',
  },
  black: {
    regular: 'text-black opacity-80',
    circle: 'bg-black-400 dark:bg-black-500 text-black-50',
  },
  white: {
    regular: 'text-white opacity-80',
    circle: 'bg-white-400 dark:bg-white-500 text-white-50',
  },
};

const iconSizeClass: Record<IconSize, string> = {
  xs: 'w-6 h-6 shrink-0',
  small: 'w-8 h-8 shrink-0',
  medium: 'w-12 h-12 shrink-0',
  large: 'w-14 h-14 shrink-0',
  xl: 'w-16 h-16 shrink-0',
  custom: '',
};

type IconData = {
  name?: Maybe<string>;
  color?: Maybe<string>;
  style?: Maybe<string>;
  size?: Maybe<string | number>;
};

interface IconProps {
  data?: Maybe<IconData>;
  parentColor?: string;
  className?: string;
  tinaField?: string;
}

// Helper functions for safe value extraction
const getValidIconName = (
  name?: Maybe<string>
): keyof typeof IconOptions | null => {
  if (!name || typeof name !== 'string') return null;
  return name in IconOptions ? (name as keyof typeof IconOptions) : null;
};

const getValidIconColor = (color?: Maybe<string>): IconColor => {
  if (!color || typeof color !== 'string') return 'orange';
  return color in iconColorClass ? (color as IconColor) : 'orange';
};

const getValidIconSize = (size?: Maybe<string | number>): IconSize => {
  if (!size) return 'medium';

  if (typeof size === 'string') {
    return size in iconSizeClass ? (size as IconSize) : 'medium';
  }

  // Handle numeric size by converting to index
  const sizeKeys = Object.keys(iconSizeClass) as IconSize[];
  const index = Math.max(0, Math.min(size, sizeKeys.length - 1));
  return sizeKeys[index] || 'medium';
};

const getValidIconStyle = (style?: Maybe<string>): IconStyle => {
  if (!style || typeof style !== 'string') return 'regular';
  return style === 'circle' || style === 'regular' ? style : 'regular';
};

export const Icon = ({
  data,
  parentColor = '',
  className = '',
  tinaField = '',
}: IconProps) => {
  const { theme } = useLayout();

  // Early return if no data provided
  if (!data) {
    return null;
  }

  // Extract and validate all values with safe defaults
  const iconName = getValidIconName(data.name);
  const iconColor = getValidIconColor(data.color);
  const iconSize = getValidIconSize(data.size);
  const iconStyle = getValidIconStyle(data.style);

  // Return null if icon name is invalid
  if (!iconName) {
    return null;
  }

  const IconSVG = IconOptions[iconName];
  const iconSizeClasses = iconSizeClass[iconSize];

  // Determine the final color based on parent color and theme
  const finalColor: IconColor = (() => {
    if (parentColor === 'primary' && iconColor === theme?.color) {
      return 'white';
    }
    return iconColor;
  })();

  // Common props for tina field
  const tinaProps = tinaField ? { 'data-tina-field': tinaField } : {};

  if (iconStyle === 'circle') {
    return (
      <div
        {...tinaProps}
        className={`relative z-10 inline-flex items-center justify-center shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[finalColor].circle} ${className}`}
      >
        <IconSVG className="w-2/3 h-2/3" />
      </div>
    );
  }

  return (
    <IconSVG
      {...tinaProps}
      className={`${iconSizeClasses} ${iconColorClass[finalColor].regular} ${className}`}
    />
  );
};
