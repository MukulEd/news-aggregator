import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getArticles,
  getCategories,
  getSources,
  getAuthors,
  incrementPage,
} from "@/features/article/articleSlice";

/* Components*/
import Filter from "@/components/home/Filter";
import ArticleList from "@/components/home/ArticleList.jsx";
import Loader from "@/components/helper/Loader";
import PreferenceViewToggle from "@/components/home/PreferenceToggle.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const { articles, categories, sources, authors } = useSelector(
    (state) => state.article
  );
  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  let articleComponent = <ArticleList />;
  if (articles.loading === "pending") {
    articleComponent = (
      <div className="flex justify-center ">
        <Loader show={articles.loading} customClass={"w-8 h-8"} />
      </div>
    );
  } else if (articles.loading === "idle") {
    articleComponent = <ArticleList />;
  }
  if (articles.error !== null) {
    articleComponent = (
      <h4 className="text-red-500 p-2 text-lg font-semibold italic">
        Error Loading Data
      </h4>
    );
  }

  return (
    <div className="mt-20 p-4 h-full relative">
      <div className="flex p-2 justify-end">
        <PreferenceViewToggle />
      </div>
      <Filter />
      <div className="overflow-hidden w-full" id="articleListing">
        {articleComponent}
      </div>
    </div>
  );
}
