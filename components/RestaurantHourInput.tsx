import { RestaurantFormInfo } from "@/pages/restaurants/create";

interface props {
  weekday: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  restaurantInfo: RestaurantFormInfo;
}

export default function RestaurantHourInput(props: props) {
  return (
    <div>
      <label className="capitalize">{props.weekday}</label>
      <label>Open:</label>
      <input
        type="number"
        name={props.weekday + " " + "open"}
        onChange={props.handleChange}
        value={props.restaurantInfo.hours[props.weekday].open}
      />
      <label>Close:</label>
      <input
        type="number"
        name={props.weekday + " " + "close"}
        onChange={props.handleChange}
        value={props.restaurantInfo.hours[props.weekday].close}
      />
    </div>
  );
}
