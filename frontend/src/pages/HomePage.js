import { FoodPage } from "../components/FoodPage";
import { postDataForFoodCard } from "../utils/postManager";
import { PostsLayout } from "../components/PostsLayout";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { AddPostButton } from "../components/AddPostButton";

export const HomePage = () => {
  const [data, updateData] = useState();
  const { searchKeyword, clearInput } = useContext(SearchContext);
  const [isNoSearchResults, setIsNoSearchResults] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("is_reloaded")) {
      clearInput();
    }

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, failCallback);
      }
    };

    const failCallback = () => {
      getData();
    };

    const successCallback = (position) => {
      const lat = -37.202969;
      const long = 174.901544;

      getData(lat, long);
    };

    const getData = async (lat = undefined, long = undefined) => {
      if (!isNaN(lat) && !isNaN(long)) {
        const res = await postDataForFoodCard(
          setIsNoSearchResults,
          searchKeyword,
          {
            lat: lat,
            long: long,
            range: 10,
            numberOfposts: 20,
          }
        );

        updateData(res);
      } else {
        const resp = await postDataForFoodCard(
          setIsNoSearchResults,
          searchKeyword
        );
        updateData(resp);
      }
    };

    getLocation();
  }, [clearInput, searchKeyword]);

  return (
    <FoodPage banner>
      <PostsLayout
        isHomePage={true}
        dataForCards={data}
        isNoSearchResult={isNoSearchResults}
      />
      <AddPostButton />
    </FoodPage>
  );
};
