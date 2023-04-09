interface HomeProps {
  restaurants: Restaurant[];
}

export default function Restaurants({ restaurants }: HomeProps) {
  return (
    <div className="flex flex-col mx-24 my-1 gap-4">
      <Restaurant_card restaurant={restaurants[0]} />
      <Restaurant_card restaurant={restaurants[0]} />
    </div>
  );
}

import Restaurant_card from "@/components/Restaurant_card";
import * as DataService from "@/lib/DataService";
import Restaurant from "@/models/Restaurant";

export async function getStaticProps() {
  const restaurants = await DataService.getAllRestaurants();

  return { props: { restaurants: restaurants } };
}
