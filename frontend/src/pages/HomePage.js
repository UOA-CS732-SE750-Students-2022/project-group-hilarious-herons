import { FoodPage } from "../components/FoodPage";
import { postDataForFoodCard } from "../utils/postManager";
import { PostsLayout } from "../components/PostsLayout";
import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
import { convertFoodCard } from "../utils/postManager";
import { BASE_URL } from "../services/api/apiAccessFunctions";

export const HomePage = () => {
  const [postData, setData] = useState();
  useSWR(`${BASE_URL}/posts`, (url) =>
    axios(url, {
      params: {
        lat: -36.91042,
        long: 174.7698112,
        range: 20,
        numberOfposts: 2,
      },
      headers: null,
    }).then((r) => {
      const converted = convertFoodCard(r.data);
      setData(converted);
    })
  );

  console.log(postData);

  return (
    <FoodPage banner>
      {postData ? <PostsLayout dataForCards={postData} /> : <div></div>}
    </FoodPage>
  );
};
