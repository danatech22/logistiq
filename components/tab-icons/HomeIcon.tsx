// components/HomeIcon.tsx (or wherever you prefer to store icons)
import React from "react";
import Svg, { Path } from "react-native-svg";

interface HomeIconProps {
  size?: number;
  color?: string;
  focused?: boolean; // Add focused prop for tab navigation
}

const HomeIcon: React.FC<HomeIconProps> = ({
  size = 24,
  color = "#9B9B9B",
  focused = false,
}) => {
  // Determine the color based on the focused prop
  const iconColor = focused ? "#087BCD" : color;

  return (
    <Svg width={size} height={size * (30 / 34)} viewBox="0 0 34 30" fill="none">
      <Path
        d="M27.5 29.4999H6.5C6.10218 29.4999 5.72064 29.3418 5.43934 29.0605C5.15804 28.7792 5 28.3977 5 27.9999V14.4999H0.5L15.9905 0.41788C16.2667 0.166597 16.6266 0.0273438 17 0.0273438C17.3734 0.0273438 17.7333 0.166597 18.0095 0.41788L33.5 14.4999H29V27.9999C29 28.3977 28.842 28.7792 28.5607 29.0605C28.2794 29.3418 27.8978 29.4999 27.5 29.4999ZM8 26.4999H26V11.7354L17 3.55438L8 11.7354V26.4999ZM17 20.4999C16.0054 20.4999 15.0516 20.1048 14.3483 19.4015C13.6451 18.6983 13.25 17.7444 13.25 16.7499C13.25 15.7553 13.6451 14.8015 14.3483 14.0982C15.0516 13.395 16.0054 12.9999 17 12.9999C17.9946 12.9999 18.9484 13.395 19.6516 14.0982C20.3549 14.8015 20.75 15.7553 20.75 16.7499C20.75 17.7444 20.3549 18.6983 19.6516 19.4015C18.9484 20.1048 17.9946 20.4999 17 20.4999Z"
        fill={iconColor} // Use the dynamic color here
      />
    </Svg>
  );
};

export default HomeIcon;
