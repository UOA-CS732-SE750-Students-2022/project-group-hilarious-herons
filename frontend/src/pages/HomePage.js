import { FoodPage } from "../components/FoodPage";
import { postDataForFoodCard } from "../utils/postManager";
import { PostsLayout } from "../components/PostsLayout";
import { useContext, useEffect, useState } from "react";
import { AddPostButton } from "../components/AddPostButton";
import { SearchContext } from "../context/SearchContext";

export const HomePage = () => {
  const [data, updateData] = useState();
  const { searchKeyword, clearInput } = useContext(SearchContext);
  const [isNoSearchResults, setIsNoSearchResults] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("is_reloaded")) {
      clearInput();
    }
    
    const getData = async () => {
      const resp = await postDataForFoodCard(setIsNoSearchResults, searchKeyword);
      updateData(resp);
    }
    
    getData();
  }, [searchKeyword]);


  return (
    <FoodPage banner>
      <PostsLayout dataForCards={data} isNoSearchResult={isNoSearchResults}/>
      <AddPostButton/>
    </FoodPage>
  );
};
