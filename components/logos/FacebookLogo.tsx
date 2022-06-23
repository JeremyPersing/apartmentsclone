import Svg, { Path } from "react-native-svg";

export const FacebookLogo = (props: any) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M24 0c13.255 0 24 10.746 24 24 0 13.256-10.745 24-24 24C10.744 48 0 37.255 0 24 0 10.746 10.745 0 24 0Z"
      fill="#3B5998"
    />
    <Path
      d="M26.922 16.522h3.093v-4.569H26.38v.017c-4.405.156-5.308 2.632-5.388 5.233h-.009v2.282h-3v4.474h3v11.994h4.521V23.959h3.704l.715-4.474h-4.417v-1.379c0-.879.585-1.584 1.417-1.584Z"
      fill="#fff"
    />
  </Svg>
);
