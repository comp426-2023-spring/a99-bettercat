import Restaurant from "@/models/Restaurant";

interface ResCardProps {
  restaurant: Restaurant;
}

export default function Restaurant_card({ restaurant }: ResCardProps) {
  console.log(restaurant);
  const priceSymbol = "$".repeat(restaurant.price);
  return (
    <div className="bg-white rounded-2xl border border-black p-6 flex flex-col gap-4">
      <p className="text-2xl font-extrabold ">{restaurant.name}</p>
      <p className="text-sm">{restaurant.description}</p>
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex justify-between gap-2">
          <p>{restaurant.category}</p>
          <p>{priceSymbol}</p>
        </div>
        <p>
          Hours: {restaurant.hours.monday.open} - {restaurant.hours.monday.close}
        </p>
      </div>
    </div>
  );
}
