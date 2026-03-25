import React from "react";

const ChefHatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6 18H18C19.1046 18 20 18.8954 20 20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V20C4 18.8954 4.89543 18 6 18Z"
      fill="#fb6514"
    />
    <path
      d="M12 2C8.68629 2 6 4.68629 6 8C6 9.10457 6.2991 10.1394 6.82196 11.0263C5.16335 11.5369 4 13.085 4 14.9091C4 16.6161 5.38392 18 7.09091 18H16.9091C18.6161 18 20 16.6161 20 14.9091C20 13.085 18.8366 11.5369 17.178 11.0263C17.7009 10.1394 18 9.10457 18 8C18 4.68629 15.3137 2 12 2Z"
      fill="#fb6514"
    />
  </svg>
);

export default ChefHatIcon;
