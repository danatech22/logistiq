// components/ProfileIcon.tsx
import React from "react";
import Svg, { Path } from "react-native-svg";

interface ProfileIconProps {
  size?: number;
  color?: string;
  focused?: boolean;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  size = 24,
  color = "#9B9B9B",
  focused = false,
}) => {
  const iconColor = focused ? "#087BCD" : color;

  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <Path
        d="M18 3C9.7155 3 3 9.7155 3 18C3 26.2845 9.7155 33 18 33C26.2845 33 33 26.2845 33 18C33 9.7155 26.2845 3 18 3Z"
        stroke={iconColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.40649 27.519C6.40649 27.519 9.74999 23.25 18 23.25C26.25 23.25 29.595 27.519 29.595 27.519M18 18C19.1935 18 20.3381 17.5259 21.182 16.682C22.0259 15.8381 22.5 14.6935 22.5 13.5C22.5 12.3065 22.0259 11.1619 21.182 10.318C20.3381 9.47411 19.1935 9 18 9C16.8065 9 15.6619 9.47411 14.818 10.318C13.9741 11.1619 13.5 12.3065 13.5 13.5C13.5 14.6935 13.9741 15.8381 14.818 16.682C15.6619 17.5259 16.8065 18 18 18Z"
        stroke={iconColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ProfileIcon;
