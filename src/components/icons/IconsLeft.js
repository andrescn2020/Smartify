import * as React from "react"

const SvgComponent = (props) => (
  <svg
    width={24}
    height={24}
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    {...props}
  >
    <path d="M20 .755 5.626 12 20 23.219l-.619.781L4 12 19.391 0 20 .755z" />
  </svg>
)

export default SvgComponent
