import { RestaurantFormInfo } from "@/pages/restaurants/create";

interface props {
  weekday: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  restaurantInfo: RestaurantFormInfo;
}

export default function RestaurantHourInput(props: props) {
  return (
    <div className="w-full flex justify-end gap-2 md:gap-8 lg:gap-14">
      <label className="capitalize w-full ">{props.weekday.substring(0, 3)}:</label>
      <label>Open:</label>
      <input
        type="number"
        name={props.weekday + " " + "open"}
        onChange={props.handleChange}
        value={props.restaurantInfo.hours[props.weekday].open}
        className="w-16 text-center border border-black rounded-2xl  "
      />
      <label>Close:</label>
      <input
        type="number"
        name={props.weekday + " " + "close"}
        onChange={props.handleChange}
        value={props.restaurantInfo.hours[props.weekday].close}
        className="w-16 text-center border border-black rounded-2xl "
      />
    </div>
  );
}
