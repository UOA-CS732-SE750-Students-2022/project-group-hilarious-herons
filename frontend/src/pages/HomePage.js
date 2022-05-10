import { FoodPage } from "../components/FoodPage";
import { postDataForFoodCard } from "../utils/postManager";
import { PostsLayout } from "../components/PostsLayout";
import { useContext, useEffect, useState } from "react";
import { AddPostButton } from "../components/AddPostButton";
import { PostService } from "../services/PostService";
import { SearchContext, SearchContextProvider } from "../context/searchContext";

export const HomePage = () => {
  const [data, updateData] = useState();
  const { clearInput, searchKeyword } = useContext(SearchContext);


  useEffect(() => {
    if (sessionStorage.getItem("is_reloaded")) {
      clearInput();
    }

    if(!searchKeyword || searchKeyword == "") {
      console.log("call");
      const getData = async () => {
        const resp = await postDataForFoodCard();
        updateData(resp);
      }
      getData();

    }
  }, []);

  useEffect(() => {
    if(searchKeyword && searchKeyword !== "") {
      console.log("search")
      PostService.searchPosts(localStorage.getItem('searchInput')).then((res) => {
        console.log(res);
        updateData(res);
      });
    }
  }, [searchKeyword]);


  return (
    <FoodPage banner>
      <PostsLayout dataForCards={data} />
      <AddPostButton/>
    </FoodPage>
  );
};
