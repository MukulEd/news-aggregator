import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector, useDispatch } from "react-redux";
import { setFilterData, getArticles } from "@/features/article/articleSlice";

const makeOptions = (data) => {
  return data.map((point) => ({ value: point.id, label: point.name }));
};

const Filter1 = () => {
  const [showFilters, setShowfilters] = useState(false);
  const { categories, sources, authors } = useSelector(
    (state) => state.article
  );
  const dispatch = useDispatch();

  const categoriesOptions = makeOptions(categories.data);
  const sourcesOptions = makeOptions(sources.data);
  const authorOptions = makeOptions(authors.data);

  const animatedComponents = makeAnimated();

  const [date, setDate] = useState([
    {
      endDate: new Date(),
      startDate: new Date(),
      key: "selection",
    },
  ]);

  const [sourcesFilter, setSourceFilter] = useState([]);
  const [authorsFilter, setAuthorFilter] = useState([]);
  const [categoriesFilter, setCategoryFilter] = useState([]);

  const handleSelectChange = (values, { name }) => {
    switch (name) {
      case "categories":
        setCategoryFilter(values);
        break;
      case "sources":
        setSourceFilter(values);
        break;
      case "authors":
        setAuthorFilter(values);
        break;
    }
  };
  const handleDateRangeChange = (item) => {
    setDate([item.selection]);
  };

  const applyFilters = () => {
    dispatch(
      setFilterData({
        sources: sourcesFilter,
        categories: categoriesFilter,
        authors: authorsFilter,
        startDate: date[0].startDate.toISOString(),
        endDate: date[0].endDate.toISOString(),
      })
    );
    setShowfilters(false);
    dispatch(getArticles());
  };

  const categoryValue = useRef();
  const sourceValue = useRef();
  const authorValue = useRef();
  const clearAll = () => {
    setSourceFilter([]);
    setAuthorFilter([]);
    setCategoryFilter([]);

    //clear Select
    categoryValue.current.clearValue();
    sourceValue.current.clearValue();
    authorValue.current.clearValue();

    //Reset Date
    setDate([
      {
        endDate: new Date(),
        startDate: new Date(),
        key: "selection",
      },
    ]);
    //Apply Filters
    applyFilters();
    setShowfilters(true);
  };

  return (
    <div className="2xl:container 2xl:mx-auto">
      <div className=" md:py-12 lg:px-6 md:px-6 py-9 px-4">
        <div className=" flex justify-between items-center mb-4">
          <h2 className=" lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">
            Articles
          </h2>

          {/*  filters Button (md and plus Screen) */}
          <button
            onClick={() => setShowfilters(!showFilters)}
            className=" cursor-pointer sm:flex hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center "
          >
            <svg
              className=" mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 4V8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 12V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 4V14"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 4V5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 9V20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Filters
          </button>
        </div>

        {/* Filters Button (Small Screen)  */}

        <button
          onClick={() => setShowfilters(!showFilters)}
          className="cursor-pointer mt-6 block sm:hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2 w-full bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center"
        >
          <svg
            className=" mr-2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 4V8"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 12V20"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 4V14"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 18V20"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 4V5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 9V20"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filters
        </button>
      </div>

      <div
        id="filterSection"
        className={
          "absolute left-0 md:py-10 z-20 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 md:w-3/4 w-full rounded shadow-2xl border-2 border-slate-100 " +
          (showFilters ? "block" : "hidden")
        }
      >
        {/* Cross button Code  */}
        <div
          onClick={() => setShowfilters(false)}
          className=" cursor-pointer absolute right-0 top-0 md:py-10 lg:px-20 md:px-6 py-9 px-4"
        >
          <svg
            className=" lg:w-6 lg:h-6 w-4 h-4"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 1L1 25"
              stroke="#1F2937"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1L25 25"
              stroke="#27272A"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Categories Section */}
        <div>
          <div className=" flex space-x-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3H15C14.4696 3 13.9609 3.21071 13.5858 3.58579C13.2107 3.96086 13 4.46957 13 5V17C13 18.0609 13.4214 19.0783 14.1716 19.8284C14.9217 20.5786 15.9391 21 17 21C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3Z"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.9994 7.35022L10.9994 5.35022C10.6243 4.97528 10.1157 4.76465 9.58539 4.76465C9.05506 4.76465 8.54644 4.97528 8.17139 5.35022L5.34339 8.17822C4.96844 8.55328 4.75781 9.06189 4.75781 9.59222C4.75781 10.1225 4.96844 10.6312 5.34339 11.0062L14.3434 20.0062"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.3 13H5C4.46957 13 3.96086 13.2107 3.58579 13.5858C3.21071 13.9609 3 14.4696 3 15V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H17"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 17V17.01"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
              Categories
            </p>
          </div>
          <div className="md:flex md:space-x-6 mt-8 grid md:grid-cols-3 gap-y-8 flex-wrap">
            <Select
              options={categoriesOptions}
              components={animatedComponents}
              isMulti
              className="md:w-1/2 w-full"
              isSearchable={true}
              onChange={handleSelectChange}
              placeholder={"Select Categories"}
              isLoading={categories.loading == "pending"}
              name={"categories"}
              isClearable={true}
              backspaceRemovesValue={true}
              ref={categoryValue}
            />
          </div>
        </div>

        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        {/* Material Section */}
        <div>
          <div className=" flex space-x-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 10H12C10.8954 10 10 10.8954 10 12V19C10 20.1046 10.8954 21 12 21H19C20.1046 21 21 20.1046 21 19V12C21 10.8954 20.1046 10 19 10Z"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
              Sources
            </p>
          </div>
          <div className=" md:flex md:space-x-6 mt-8 grid md:grid-cols-3 gap-y-8 flex-wrap">
            <Select
              options={sourcesOptions}
              components={animatedComponents}
              isMulti
              className="md:w-1/2 w-full"
              isSearchable={true}
              placeholder={"Select Sources"}
              isLoading={sources.loading == "pending"}
              onChange={handleSelectChange}
              name={"sources"}
              isClearable={true}
              backspaceRemovesValue={true}
              ref={sourceValue}
            />
          </div>
        </div>

        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        {/* Size Section */}
        <div>
          <div className=" flex space-x-2">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              ></path>
            </svg>
            <p className="  lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
              Authors
            </p>
          </div>
          <div className=" md:flex md:space-x-6 mt-8 grid md:grid-cols-3 gap-y-8 flex-wrap">
            <Select
              options={authorOptions}
              components={animatedComponents}
              isMulti
              className="md:w-1/2 w-full"
              isSearchable={true}
              placeholder={"Select authors"}
              isLoading={authors.loading == "pending"}
              onChange={handleSelectChange}
              name={"authors"}
              isClearable={true}
              backspaceRemovesValue={true}
              ref={authorValue}
            />
          </div>
        </div>

        <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

        {/* Collection Section */}

        <div>
          <div className=" flex space-x-2">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              ></path>
            </svg>
            <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 ">
              Date
            </p>
          </div>
          <div className=" flex mt-8 space-x-8">
            <DateRange
              editableDateInputs={true}
              onChange={handleDateRangeChange}
              moveRangeOnFirstSelection={false}
              ranges={date}
              maxDate={new Date()}
            />
          </div>
        </div>

        <div className="px-0 mt-10 w-full md:w-auto md:mt-0 md:py-10 lg:px-20 md:px-6 flex flex-wrap md:justify-between">
          <button
            onClick={clearAll}
            className="w-1/3 hover:bg-red-700 flex items-center text-center focus:ring focus:ring-offset-2 focus:ring-red-600 text-base leading-4 font-medium py-4 px-10 text-white bg-red-600"
          >
            <svg
              className=" w-3 h-3 mr-2 mt-0.5"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 1L1 25"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M1 1L25 25"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            Clear All
          </button>
          <button
            onClick={applyFilters}
            className="w-1/2 hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter1;
