import { useSelector } from "../store";
import { getItemCount } from "../utils";
import { BsCartPlusFill } from "react-icons/bs";

export function CartInfo() {
  // Creating
  const cartItems = useSelector((state) => state.cart);
  const count = getItemCount(cartItems);
  console.log(cartItems);
  return (
    <div className="flex-col ">
      <span className=" bg-red-500 rounded-full w-[50px] h-[50px] m-3 p-1 ">
        {count}
      </span>
      <BsCartPlusFill size={40} color="white" />
    </div>
  );
}
