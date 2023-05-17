import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getArticles,
  setSearchKeyWord,
  setFilterData,
} from "@/features/article/articleSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar({ logout, user }) {
  const [rotate, setRotate] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      dispatch(setSearchKeyWord(e.target.value));
      dispatch(setFilterData({}));
      dispatch(getArticles());
    }
  };

  const navigate = useNavigate();
  const navigateToPersonalized = () => {
    setRotate(!rotate);
    setShow(false);
    navigate("personalization");
  };

  const navigateHome = () => {
    navigate("home");
  };

  return (
    <div className="fixed h-auto w-full z-10" style={{ maxHeight: 600 + "px" }}>
      <div className=" h-full relative">
        <div className="bg-white">
          <div className="2xl:container 2xl:mx-auto">
            <nav className>
              <div className=" flex flex-row justify-between">
                <div className=" flex space-x-3 items-center py-5 lg:pl-7 sm:pl-6 py-6 pl-4 pr-8">
                  <button onClick={navigateHome} className="flex">
                    <svg
                      className="w-8 h-8"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="48"
                        height="48"
                        fill="white"
                        fillOpacity="0.01"
                      ></rect>
                      <path
                        d="M18 10L24 4M24 4L30 10M24 4V14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M18 38L24 44M24 44L30 38M24 44V34"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M38 18L44 24M44 24L38 30M44 24H34"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M10 18L4 24M4 24L10 30M4 24H14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <circle
                        cx="24"
                        cy="24"
                        r="4"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></circle>
                    </svg>
                    <h1 className=" font-semibold text-2xl leading-6 text-gray-800">
                      News
                    </h1>
                  </button>
                </div>
                {/* For large (i.e. desktop and laptop sized screen) */}
                <div className="lg:flex hidden flex-auto justify-between flex-row px-7 border-l border-r border-gray-200 py-6">
                  <div className>
                    <h3 className=" font-normal text-lg leading-5 text-gray-800 mt-2 flex  items-center">
                      Search News by keyword
                      <svg
                        className="w-6 h-6 ml-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-2 -2 24 24"
                        fill="currentColor"
                      >
                        <path d="M10 2h4.98a2 2 0 0 1 1.03.286L18.863 4a2.333 2.333 0 0 1 0 4L16.01 9.714a2 2 0 0 1-1.03.286H10v9a1 1 0 0 1-2 0v-9H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6V1a1 1 0 1 1 2 0v1z"></path>
                      </svg>
                    </h3>
                  </div>
                  <div className=" focus:outline-none focus:ring foucs:ring-offset-2 focus:ring-gray-800 bg-gray-50 flex items-center px-4 py-3.5 space-x-3 rounded ">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.66667 11.3333C9.24399 11.3333 11.3333 9.24399 11.3333 6.66667C11.3333 4.08934 9.24399 2 6.66667 2C4.08934 2 2 4.08934 2 6.66667C2 9.24399 4.08934 11.3333 6.66667 11.3333Z"
                        stroke="#6B7280"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 14L10 10"
                        stroke="#6B7280"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      aria-label="Search Bar"
                      className="focus:outline-none w-56  xl:w-64 bg-gray-50 font-normal text-sm leading-4 text-gray-500 placeholder-gray-500 "
                      type="text"
                      placeholder="Search"
                      onKeyUp={handleKeyUp}
                    />
                  </div>
                </div>
                <div className=" hidden sm:flex justify-end flex-row lg:pr-7 sm:pr-6 py-6 pr-4 pl-8">
                  <div className=" flex justify-center items-center flex-row relative">
                    <div className="ml-2">
                      <p className="text-lg leading-4 font-semibold text-gray-800">
                        {user && user.name}
                      </p>
                      <p className=" font-normal text-xs leading-3 text-gray-600 mt-1">
                        {user && user.email}
                      </p>
                    </div>
                    <svg
                      onClick={() => setRotate(!rotate)}
                      className={`${
                        rotate ? "rotate-180" : ""
                      } cursor-pointer transform duration-100 xl:ml-7 lg:ml-3.5 ml-2 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-gray-800`}
                      width={14}
                      height={8}
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L7 7L13 1"
                        stroke="#1F2937"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {rotate && (
                      <ul className="visible md:block hidden transition duration-300 opacity-100 bg-white  shadow-xl  border-2 border-gray-100 rounded mt-2 pb-1 w-48 absolute top-9 ">
                        <li className="cursor-pointer  text-sm  leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">
                          <button
                            className="w-full text-left"
                            onClick={navigateToPersonalized}
                          >
                            Personalization
                          </button>
                        </li>
                        <li className="text-sm  leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">
                          <button onClick={logout} className="w-full text-left">
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                {/* Burger Icon */}
                <div
                  id="bgIcon"
                  onClick={() => setShow(!show)}
                  className=" focus:outline-none focus:ring focus:ring-offset-2 focus:ring-gray-800 block sm:hidden cursor-pointer lg:pr-7 sm:pr-6 py-6 pr-4"
                >
                  <svg
                    className={`${show ? "hidden" : "n-show"}`}
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className=" transform duration-150"
                      d="M4 6H20"
                      stroke="#1F2937"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 12H20"
                      stroke="#1F2937"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className=" transform duration-150"
                      d="M4 18H20"
                      stroke="#1F2937"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    className={`${show ? "n-show" : "hidden"} `}
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="#1F2937"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="#1F2937"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              {/* for medium-sized devices */}
              <div className="lg:hidden  sm:flex flex-col lg:px-7 sm:px-6 px-4 ">
                <hr className=" w-full bg-gray-200 " />
                <div className="lg:hidden flex flex-auto justify-between mt-3 flex-row pb-4">
                  <div className>
                    <h3 className="font-normal text-sm leading-5 text-gray-800 mt-2 flex items-center">
                      Search News by keyword
                    </h3>
                  </div>
                  <div className=" focus:outline-none focus:ring foucs:ring-offset-2 focus:ring-gray-800 bg-gray-50 flex items-center px-4 py-3.5 space-x-3 rounded ">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.66667 11.3333C9.24399 11.3333 11.3333 9.24399 11.3333 6.66667C11.3333 4.08934 9.24399 2 6.66667 2C4.08934 2 2 4.08934 2 6.66667C2 9.24399 4.08934 11.3333 6.66667 11.3333Z"
                        stroke="#6B7280"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 14L10 10"
                        stroke="#6B7280"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <input
                      aria-label="Search Bar"
                      className=" focus:outline-none w-44 lg:w-56 xl:w-64 bg-gray-50 font-normal text-sm leading-4 text-gray-500 placeholder-gray-500 "
                      type="text"
                      placeholder="Search"
                      onKeyUp={handleKeyUp}
                    />
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Mobile and Small devices Navigation */}
        <div
          id="MobileNavigation"
          className={`${
            show ? "" : "hidden"
          } transform duration-150 sm:hidden h-full bg-white `}
        >
          <div className=" flex flex-col justify-between h-auto ">
            <div className=" flex flex-col lg:px-7 sm:px-6 px-4">
              <hr className=" w-full bg-gray-200 " />
              <div className="lg:hidden  mt-3 pb-4 ml-2">
                <div className="flex flex-auto justify-between">
                  <div className="">
                    <p className="text-lg leading-4 font-semibold text-gray-800">
                      {user.name}
                    </p>
                    <p className=" font-normal text-xs leading-3 text-gray-600 mt-1">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="my-4 ">
                  <ul className=" transition duration-300 opacity-100 bg-white">
                    <li className="cursor-pointer  text-sm  leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">
                      <button
                        className="w-full text-left"
                        onClick={navigateToPersonalized}
                      >
                        Personalization
                      </button>
                    </li>
                    <li className="cursor-pointer  text-sm  leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">
                      <button onClick={logout} className="w-full text-left">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
