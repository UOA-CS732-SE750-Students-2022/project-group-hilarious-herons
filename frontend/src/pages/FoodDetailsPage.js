import { AddPostButton } from "../components/AddPostButton";
import { BackHomeButton } from "../components/BackHomeButton";
import { FoodDetailsCard } from "../components/FoodDetailsCard";
import { FoodPage } from "../components/FoodPage";
export const FoodDetailsPage = () => {
  return (
    <FoodPage>
      <BackHomeButton />
      <FoodDetailsCard />
      <AddPostButton />
    </FoodPage>
  );
};
