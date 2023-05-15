import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Article from "./Article";
export default function ArticleList() {
  const { articles } = useSelector((state) => state.article);

  return (
    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
      {articles.data.map((art) => (
        <Article key={art.id} data={art}></Article>
      ))}
    </div>
  );
}
