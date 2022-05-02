import { FoodDetailsCard } from "../components/FoodDetailsCard";
import { FoodPage } from "../components/FoodPage";
import { AddPostButton } from "../components/AddPostButton";

export const FoodDetailsPage = () => {
  return (
    <FoodPage>
      <FoodDetailsCard />
      <AddPostButton />
    </FoodPage>
  );
};
