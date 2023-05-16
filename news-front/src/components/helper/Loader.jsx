export default function loader({ show, customClass = "w-5 h-5" }) {
  return (
    show && (
      <svg
        className={customClass + " animate-spin "}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <g>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M3.055 13H5.07a7.002 7.002 0 0 0 13.858 0h2.016a9.001 9.001 0 0 1-17.89 0zm0-2a9.001 9.001 0 0 1 17.89 0H18.93a7.002 7.002 0 0 0-13.858 0H3.055z"></path>
        </g>
      </svg>
    )
  );
}
