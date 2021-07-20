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
import { FiAperture } from "react-icons/fi";

const iconOptions = {
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
};

export const Icon = ({ icon, parentColor = "" }) => {
  const IconSVG = React.useMemo(() => {
    if (!icon.name || icon.name === "" || !iconOptions[icon.name]) {
      return randomProperty(iconOptions);
    } else {
      return iconOptions[icon.name];
    }
  }, [icon.name]);

  const iconSize = icon.size ? icon.size : "large";

  /* Full class strings are required for Tailwind's just-in-time mode,
     I would love a better solution that doesn't require so much repetition */

  const iconCircleColorClass = {
    blue: "bg-blue-400 dark:bg-blue-500 text-blue-50",
    teal: "bg-teal-400 dark:bg-teal-500 text-teal-50",
    green: "bg-green-400 dark:bg-green-500 text-green-50",
    red: "bg-red-400 dark:bg-red-500 text-red-50",
    pink: "bg-pink-400 dark:bg-pink-500 text-pink-50",
    purple: "bg-purple-400 dark:bg-purple-500 text-purple-50",
    orange: "bg-orange-400 dark:bg-orange-500 text-orange-50",
    yellow: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50",
  };

  const iconColorClass = {
    blue: "text-blue-400",
    teal: "text-teal-400",
    green: "text-green-400",
    red: "text-red-400",
    pink: "text-pink-400",
    purple: "text-purple-400",
    orange: "text-orange-400",
    yellow: "text-yellow-400",
    white: "text-gray-100",
  };

  const iconSizeClass = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-14 h-14",
  };

  const Component = React.useMemo(() => {
    if (!IconSVG) return null;
    if (icon.style == "circle") {
      return (
        <div
          className={`relative z-10 inline-flex items-center justify-center flex-shrink-0 ${
            iconSizeClass[iconSize]
          } rounded-full ${iconCircleColorClass[icon.color]}`}
        >
          <IconSVG className="w-2/3 h-2/3" />
        </div>
      );
    } else {
      return (
        <IconSVG
          className={`${iconSizeClass[iconSize]} ${
            iconColorClass[
              parentColor === "primary" && icon.color === "blue"
                ? "white"
                : icon.color
            ]
          }`}
        />
      );
    }
  }, [parentColor, icon.style, icon.size, icon.color, icon.name, IconSVG]);

  return Component;
};

const randomProperty = (obj) => {
  var keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};
