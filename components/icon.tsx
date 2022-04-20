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
import { Theme, ThemeContext } from "./theme";
import { FaBeer, FaCoffee, FaPalette } from "react-icons/fa";
// @ts-ignore
import TinaIconSvg from "../public/tina.svg";
import type { TinaField } from "tinacms";
import { cp } from "fs";

const biIconOptions = {
  code: BiCodeBlock,
  like: BiLike,
  map: BiMapAlt,
  palette: BiPalette,
  chart: BiPieChartAlt2,
  pin: BiPin,
  shield: BiShield,
  settings: BiSlider,
  store: BiStore,
  ball: BiTennisBall,
  tube: BiTestTube,
  trophy: BiTrophy,
  user: BiUserCircle,
  beer: BiBeer,
  chat: BiChat,
  cloud: BiCloud,
  coffee: BiCoffeeTogo,
  world: BiWorld,
  aperture: FiAperture,
  tina: TinaIconSvg,
};

const heroIconOptions = {
  code: HiTerminal,
  like: HiThumbUp,
  map: HiMap,
  palette: HiColorSwatch,
  chart: HiChartBar,
  pin: HiLocationMarker,
  shield: HiShieldCheck,
  settings: HiAdjustments,
  store: HiShoppingCart,
  ball: BiTennisBall,
  tube: HiBeaker,
  trophy: ImTrophy,
  user: HiUser,
  beer: FaBeer,
  chat: HiChatAlt2,
  cloud: HiCloud,
  coffee: FaCoffee,
  world: BiWorld,
  aperture: FiAperture,
  tina: TinaIconSvg,
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
  const theme = React.useContext(ThemeContext);

  const iconOptions =
    theme.icon === "boxicon" ? biIconOptions : heroIconOptions;

  const IconSVG =
    !data.name || !iconOptions[data.name]
      ? Object.keys(iconOptions)[0]
      : iconOptions[data.name];

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
        label: color.charAt(0).toUpperCase() + color.slice(1),
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
      options: [
        {
          label: "Random",
          value: "",
        },
        {
          label: "Aperture",
          value: "aperture",
        },
        {
          label: "Code Block",
          value: "code",
        },
        {
          label: "Like",
          value: "like",
        },
        {
          label: "Map",
          value: "map",
        },
        {
          label: "Palette",
          value: "palette",
        },
        {
          label: "Pie Chart",
          value: "chart",
        },
        {
          label: "Pin",
          value: "pin",
        },
        {
          label: "Shield",
          value: "shield",
        },
        {
          label: "Setting Sliders",
          value: "settings",
        },
        {
          label: "Store",
          value: "store",
        },
        {
          label: "Tennis Ball",
          value: "ball",
        },
        {
          label: "Test Tube",
          value: "tube",
        },
        {
          label: "Trophy",
          value: "trophy",
        },
        {
          label: "User",
          value: "user",
        },
        {
          label: "Beer",
          value: "beer",
        },
        {
          label: "Chat",
          value: "chat",
        },
        {
          label: "Cloud",
          value: "cloud",
        },
        {
          label: "Coffee",
          value: "coffee",
        },
        {
          label: "World",
          value: "world",
        },
        {
          label: "Tina",
          value: "tina",
        },
      ],
    },
  ],
};
