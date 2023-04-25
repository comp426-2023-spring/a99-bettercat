import Restaurant from "@/models/Restaurant";
import Link from "next/link";

interface ResCardProps {
  restaurant: Restaurant;
}

export default function Restaurant_card({ restaurant }: ResCardProps) {
  const weekDay = getWeekday();
  const priceSymbol = "$".repeat(restaurant.price);
  return (
    <div className="bg-white rounded-2xl border border-black p-6 flex flex-col gap-4">
      <Link
        href={`/restaurants/${restaurant.id}`} // TODO: currently no access to id
        className="text-2xl font-extrabold "
      >
        {restaurant.name}
      </Link>
      <p className="text-sm">{restaurant.description}</p>
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex justify-between gap-2">
          <p>{restaurant.category}</p>
          <p>{priceSymbol}</p>
        </div>
        <p>
          Hours Today: {Math.floor(restaurant.hours[weekDay].open / 100).toString()}:{restaurant.hours[weekDay].open.toString().slice(2)} - {Math.floor(restaurant.hours[weekDay].close / 100).toString()}:{restaurant.hours[weekDay].close.toString().slice(2)}
        </p>
      </div>
    </div>
  );
}

// Helper method that get the current week day
function getWeekday() {
  const day = new Date().getDay();
  switch (day) {
    case 0:
      return "sunday";
      break;
    case 1:
      return "monday";
      break;
    case 2:
      return "tuesday";
      break;
    case 3:
      return "wednesday";
      break;
    case 4:
      return "thursday";
      break;
    case 5:
      return "friday";
      break;
    default:
      return "saturday";
      break;
  }
}
