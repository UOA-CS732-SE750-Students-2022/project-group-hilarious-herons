import { FoodPage } from "../components/FoodPage";
import { postDataForFoodCard } from "../utils/postManager";
import { PostsLayout } from "../components/PostsLayout";
import { useEffect, useState } from "react";
import { AddPostButton } from "../components/AddPostButton";

export const HomePage = () => {
  const [data, updateData] = useState();
  useEffect(() => {
    const getData = async () => {
      const resp = await postDataForFoodCard();
      updateData(resp);
    };
    getData();
  }, []);
  return (
    <FoodPage banner>
      <PostsLayout dataForCards={data} />
      <AddPostButton />
    </FoodPage>
  );
};
