import { IonContent } from "@ionic/react";
import { AddPostButton } from "../components/AddPostButton";
import { FoodDetailsCard } from "../components/FoodDetailsCard";
import { FoodPage } from "../components/FoodPage";
export const FoodDetailsPage = () => {
  return (
    <FoodPage>
      <FoodDetailsCard />
      <AddPostButton />
    </FoodPage>
  );
};
