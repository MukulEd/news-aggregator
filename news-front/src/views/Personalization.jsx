import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector, useDispatch } from "react-redux";
import {
  setFilterData,
  getArticles,
  setPersonalizeData,
} from "@/features/article/articleSlice";
import { toast } from "react-toastify";
import axios from "@/axios.js";
import Loader from "@/components/helper/Loader";

const makeOptions = (data) => {
  return data.map((point) => ({ value: point.id, label: point.name }));
};

export default function Personalized() {
  const dispatch = useDispatch();

  const { categories, sources, authors, user } = useSelector(
    (state) => state.article
  );

  const categoriesOptions = makeOptions(categories.data);
  const sourcesOptions = makeOptions(sources.data);
  const authorOptions = makeOptions(authors.data);
  const animatedComponents = makeAnimated();

  const [sourcesPersonal, setSource] = useState([]);
  const [authorsPersonal, setAuthor] = useState([]);
  const [categoriesPersonal, setCategory] = useState([]);
  const [updatingData, setUpdatingData] = useState(false);

  const handleSelectChange = (values, { name }) => {
    switch (name) {
      case "categories":
        setCategory(values);
        break;
      case "sources":
        setSource(values);
        break;
      case "authors":
        setAuthor(values);
        break;
    }
  };
  useEffect(() => {
    console.log(user, 1);
  });
  const updatePreferences = () => {
    setUpdatingData(true);
    axios
      .put("/update-preferences", {
        sources: sourcesPersonal,
        categories: categoriesPersonal,
        authors: authorsPersonal,
      })
      .then(() => {
        //dispatch to set Preferences for user
        dispatch(
          setPersonalizeData({
            sources: sourcesPersonal,
            categories: categoriesPersonal,
            authors: authorsPersonal,
          })
        );
        toast.success("Preferences Successfully Updated");
      })
      .catch(() => {
        toast.error(
          "Facing Issues in Updating your preferences,Please try after sometime"
        );
      })
      .finally(() => {
        setUpdatingData(false);
      });
  };

  return (
    <div className="mt-20 p-4 h-full ">
      <h3 className="font-semibold text-lg">
        Select your favorite authors, categories,sources for personalized
        experience.
      </h3>
      {!user.loading &&
      authors.loading == "idle" &&
      categories.loading == "idle" &&
      sources.loading == "idle" ? (
        <div className="mt-5">
          <div
            className={
              " md:py-10 z-20 lg:px-20 md:px-6 py-9 px-4 w-full rounded "
            }
          >
            <div className="mb-5">
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
                  defaultValue={user.categories}
                />
              </div>
            </div>

            <div className="mb-5">
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
                  defaultValue={user.sources}
                />
              </div>
            </div>

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
                  defaultValue={user.authors}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center md:w-1/2 w-full">
            <button
              onClick={updatePreferences}
              disabled={updatingData}
              className="w-1/2 hover:bg-gray-700 flex items-center justify-center disabled:bg-gray-500 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800"
            >
              <Loader show={updatingData} /> Update Preferences
            </button>
          </div>
        </div>
      ) : (
        <Loader show={true} />
      )}
    </div>
  );
}
