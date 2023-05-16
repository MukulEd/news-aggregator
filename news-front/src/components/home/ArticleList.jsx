import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Article from "./Article";
import Loader from "@/components/helper/Loader";
import { getArticles, incrementPage } from "@/features/article/articleSlice";
export default function ArticleList() {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.article);
  const handleScroll = () => {
    console.log("handleScroll");
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      articles.scrollLoading
    ) {
      return;
    }

    dispatch(incrementPage());
    dispatch(getArticles());
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [articles.scrollLoading]);
  return (
    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
      {articles.data.map((art) => (
        <Article key={art.id} data={art}></Article>
      ))}

      <div className="flex justify-center items-center">
        {articles.scrollLoading ? "Loading Data" : "No More Data Found"}
        <Loader show={articles.scrollLoading} customClass={"w-8 h-8"} />
      </div>
    </div>
  );
}
