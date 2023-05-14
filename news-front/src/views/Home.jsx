import axiosClient from "../axios.js";
import { useRef, useState, useEffect } from "react";

/* Components*/
import Filter from "@/components/home/Filter";
import ArticleList from "@/components/home/ArticleList.jsx";

export default function Home() {
  const [sources, setSources] = useState([]);
  const [sourceNews, setSourceNews] = useState([]);
  const [categoryNews, setcategoryNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   onGetSources();
  //   onGetSelectedCategories();
  //   onGetSelectedSources();
  // }, []);

  const onGetSources = (ev) => {
    // axiosClient.post('/getSources')
    //     .then((data) => {
    //         setSources(data.data.sources)
    //     })
  };
  const onGetSelectedCategories = (ev) => {
    axiosClient.post("/getSelectedCategories").then((data) => {
      let categories = [];
      Object.keys(data.data.result).map((key) => {
        categories.push(data.data.result[key].category_id);
      });
      setSelectedCategories(categories);
    });
  };
  const onGetSelectedSources = (ev) => {
    axiosClient.post("/getSelectedSources").then((data) => {
      let sources = [];
      Object.keys(data.data.result).map((key) => {
        sources.push(data.data.result[key].source_id);
      });
      setSelectedSources(sources);
    });
  };

  const onSetSelectedCategories = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    }
    onCategoryNews(category);
  };

  const onCategoryNews = (category) => {
    setLoading(true);
    const categoryPayload = {
      category_id: category,
    };
    axiosClient.post("/getCategoryNews", categoryPayload).then((data) => {
      setcategoryNews(data.data.articles);
      setLoading(false);
    });
  };
  const onSourceNews = (id) => {
    setLoading(true);
    setSelectedSources([id]);

    const sourceNewsPayload = {
      source_id: id,
    };
    axiosClient.post("/getSourceNews", sourceNewsPayload).then((data) => {
      setSourceNews(data.data.articles);
      setLoading(false);
    });
  };
  return (
    <div className="mt-20 p-4 h-full relative">
      <Filter />
      <ArticleList />
    </div>
  );
}
