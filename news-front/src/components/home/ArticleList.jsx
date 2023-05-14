import { useEffect, useState } from "react";
import Article from "./Article";
export default function ArticleList() {
  const [articles, setArticles] = useState([]);

  //fetch articles
  useEffect(() => {
    const articlesData = [
      {
        id: 2,
        name: "Article1",
      },
      {
        id: 3,
        name: "Article1",
      },
      {
        id: 4,
        name: "Article1",
      },
      {
        id: 5,
        name: "Article1",
      },
      {
        id: 6,
        name: "Article1",
      },
      {
        id: 7,
        name: "Article1",
      },
    ];
    setArticles(articlesData);
  }, []);
  return (
    <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
      {articles.map((art) => (
        <Article key={art.id}></Article>
      ))}
    </div>
  );
}
