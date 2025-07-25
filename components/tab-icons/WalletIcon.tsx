// components/CardIcon.tsx
import React from "react";
import Svg, { Path } from "react-native-svg";

interface CardIconProps {
  size?: number;
  color?: string;
  focused?: boolean;
}

const CardIcon: React.FC<CardIconProps> = ({
  size = 24,
  color = "#9B9B9B",
  focused = false,
}) => {
  const iconColor = focused ? "#087BCD" : color;

  return (
    <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <Path
        d="M29.1524 6.09741H6.84741C5.85285 6.09741 4.89902 6.4925 4.19576 7.19576C3.4925 7.89902 3.09741 8.85285 3.09741 9.84741V26.1524C3.09741 27.147 3.4925 28.1008 4.19576 28.8041C4.89902 29.5073 5.85285 29.9024 6.84741 29.9024H29.1524C30.147 29.9024 31.1008 29.5073 31.8041 28.8041C32.5073 28.1008 32.9024 27.147 32.9024 26.1524V9.84741C32.9024 8.85285 32.5073 7.89902 31.8041 7.19576C31.1008 6.4925 30.147 6.09741 29.1524 6.09741ZM31.4024 20.9924H21.7724C20.9768 20.9924 20.2137 20.6763 19.6511 20.1137C19.0885 19.5511 18.7724 18.7881 18.7724 17.9924C18.7724 17.1968 19.0885 16.4337 19.6511 15.8711C20.2137 15.3085 20.9768 14.9924 21.7724 14.9924H31.4024V20.9924ZM21.7724 13.4924C20.5789 13.4924 19.4343 13.9665 18.5904 14.8104C17.7465 15.6543 17.2724 16.7989 17.2724 17.9924C17.2724 19.1859 17.7465 20.3305 18.5904 21.1744C19.4343 22.0183 20.5789 22.4924 21.7724 22.4924H31.4024V26.1524C31.4024 26.7491 31.1654 27.3214 30.7434 27.7434C30.3214 28.1654 29.7491 28.4024 29.1524 28.4024H6.84741C6.25067 28.4024 5.67838 28.1654 5.25642 27.7434C4.83447 27.3214 4.59741 26.7491 4.59741 26.1524V9.84741C4.59741 9.25067 4.83447 8.67838 5.25642 8.25642C5.67838 7.83446 6.25067 7.59741 6.84741 7.59741H29.1524C29.7491 7.59741 30.3214 7.83446 30.7434 8.25642C31.1654 8.67838 31.4024 9.25067 31.4024 9.84741V13.4924H21.7724Z"
        fill={iconColor}
      />
      <Path
        d="M21.7786 19.4939C22.607 19.4939 23.2786 18.8223 23.2786 17.9939C23.2786 17.1655 22.607 16.4939 21.7786 16.4939C20.9501 16.4939 20.2786 17.1655 20.2786 17.9939C20.2786 18.8223 20.9501 19.4939 21.7786 19.4939Z"
        fill={iconColor}
      />
      <Path
        d="M4.5 9.75L28.25 9.75C28.8023 9.75 29.25 10.1977 29.25 10.75V13.5"
        stroke={iconColor}
        strokeWidth="4.5"
      />
    </Svg>
  );
};

export default CardIcon;
