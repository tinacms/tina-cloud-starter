import * as React from "react";
import {
  BiCodeBlock,
  BiLike,
  BiMapAlt,
  BiPalette,
  BiPieChartAlt2,
  BiPin,
  BiShield,
  BiSlider,
  BiStore,
  BiTennisBall,
  BiTestTube,
  BiTrophy,
  BiUserCircle,
  BiBeer,
  BiChat,
  BiCloud,
  BiCoffeeTogo,
  BiWorld,
} from "react-icons/bi";
import { ImTrophy } from "react-icons/im";
import {
  HiAdjustments,
  HiBeaker,
  HiChartBar,
  HiChatAlt2,
  HiCloud,
  HiColorSwatch,
  HiLocationMarker,
  HiMap,
  HiShieldCheck,
  HiShoppingCart,
  HiTerminal,
  HiThumbUp,
  HiUser,
} from "react-icons/hi";
import { FiAperture } from "react-icons/fi";
import { useTheme } from "../layout";
import { FaBeer, FaCoffee } from "react-icons/fa";
import TinaIconSvg from "../../public/tina.svg";
import type { TinaField } from "tinacms";

const iconOptions = {
  code: { bi: BiCodeBlock, hi: HiTerminal },
  like: { bi: BiLike, hi: HiThumbUp },
  map: { bi: BiMapAlt, hi: HiMap },
  palette: { bi: BiPalette, hi: HiColorSwatch },
  chart: { bi: BiPieChartAlt2, hi: HiChartBar },
  pin: { bi: BiPin, hi: HiLocationMarker },
  shield: { bi: BiShield, hi: HiShieldCheck },
  settings: { bi: BiSlider, hi: HiAdjustments },
  store: { bi: BiStore, hi: HiShoppingCart },
  ball: { bi: BiTennisBall, hi: BiTennisBall },
  tube: { bi: BiTestTube, hi: HiBeaker },
  trophy: { bi: BiTrophy, hi: ImTrophy },
  user: { bi: BiUserCircle, hi: HiUser },
  beer: { bi: BiBeer, hi: FaBeer },
  chat: { bi: BiChat, hi: HiChatAlt2 },
  cloud: { bi: BiCloud, hi: HiCloud },
  coffee: { bi: BiCoffeeTogo, hi: FaCoffee },
  world: { bi: BiWorld, hi: BiWorld },
  aperture: { bi: FiAperture, hi: FiAperture },
  tina: { bi: TinaIconSvg, hi: TinaIconSvg },
};

const iconColorClass: { [name: string]: { regular: string; circle: string } } =
  {
    blue: {
      regular: "text-blue-400",
      circle: "bg-blue-400 dark:bg-blue-500 text-blue-50",
    },
    teal: {
      regular: "text-teal-400",
      circle: "bg-teal-400 dark:bg-teal-500 text-teal-50",
    },
    green: {
      regular: "text-green-400",
      circle: "bg-green-400 dark:bg-green-500 text-green-50",
    },
    red: {
      regular: "text-red-400",
      circle: "bg-red-400 dark:bg-red-500 text-red-50",
    },
    pink: {
      regular: "text-pink-400",
      circle: "bg-pink-400 dark:bg-pink-500 text-pink-50",
    },
    purple: {
      regular: "text-purple-400",
      circle: "bg-purple-400 dark:bg-purple-500 text-purple-50",
    },
    orange: {
      regular: "text-orange-400",
      circle: "bg-orange-400 dark:bg-orange-500 text-orange-50",
    },
    yellow: {
      regular: "text-yellow-400",
      circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50",
    },
    white: {
      regular: "text-white opacity-80",
      circle: "bg-white-400 dark:bg-white-500 text-white-50",
    },
  };

const iconSizeClass = {
  small: "w-8 h-8",
  medium: "w-12 h-12",
  large: "w-14 h-14",
};

export const Icon = ({
  data,
  parentColor = "",
  className = "",
  tinaField = "",
}) => {
  const theme = useTheme();

  const iconName = data.name || Object.keys(iconOptions)[0];
  const IconSVG = iconOptions[iconName][theme.icon === "boxicon" ? "bi" : "hi"];

  const iconSizeClasses = data.size && iconSizeClass[data.size];

  /* Full class strings are required for Tailwind's just-in-time mode,
     I would love a better solution that doesn't require so much repetition */

  const iconColor = data.color
    ? data.color === "primary"
      ? theme.color
      : data.color
    : theme.color;

  if (data.style == "circle") {
    return (
      <div
        data-tinafield={tinaField}
        className={`relative z-10 inline-flex items-center justify-center flex-shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[iconColor].circle} ${className}`}
      >
        <IconSVG className="w-2/3 h-2/3" />
      </div>
    );
  } else {
    const iconColorClasses =
      iconColorClass[
        parentColor === "primary" &&
        (iconColor === theme.color || iconColor === "primary")
          ? "white"
          : iconColor
      ].regular;
    return (
      <IconSVG
        data-tinafield={tinaField}
        className={`${iconSizeClasses} ${iconColorClasses} ${className}`}
      />
    );
  }
};

const formatFieldLabel = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const iconSchema: TinaField = {
  type: "object",
  label: "Icon",
  name: "icon",
  fields: [
    {
      type: "string",
      label: "Color",
      name: "color",
      options: Object.keys(iconColorClass).map((color) => ({
        label: formatFieldLabel(color),
        value: color,
      })),
    },
    {
      name: "style",
      label: "Style",
      type: "string",
      options: [
        {
          label: "Circle",
          value: "circle",
        },
        {
          label: "Float",
          value: "float",
        },
      ],
    },
    {
      type: "string",
      label: "Icon",
      name: "name",
      options: Object.keys(iconOptions).map((icon) => ({
        label: formatFieldLabel(icon),
        value: icon,
      })),
    },
  ],
};
