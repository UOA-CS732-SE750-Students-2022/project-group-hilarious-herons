import { AddPostButton } from "../components/AddPostButton";
import { FoodDetailsCard } from "../components/FoodDetailsCard";
import { FoodPage } from "../components/FoodPage";
export const FoodDetailsPage = () => {
  return (
    <FoodPage canSearch={false}>
      <FoodDetailsCard />
      <AddPostButton />
    </FoodPage>
  );
};
