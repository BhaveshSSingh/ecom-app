import "./cart.css";
import { ACTION, useDispatch, useSelector } from "../../store";
import { StarRating } from "../../components/StarRating";
import { getItemCount, getSubTotal } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/auth";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const itemCount = getItemCount(cartItems);
  const subTotal = getSubTotal(cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const proceedToCheckout = () => {
    navigate("/checkout");
  };
  const handleQuantityChange = (e, { product, quantity }) => {
    const updatedQuantity = e.target.value;
    if (updatedQuantity < quantity) {
      // reducing the quantity
      dispatch({
        type: ACTION.REMOVE_FROM_CART,
        payload: { product },
      });
    } else {
      dispatch({ type: ACTION.ADD_TO_CART, payload: { product } });
    }
  };

  return (
    <div className="cart">
      <section className="cart__items">
        <h2>Shopping Cart</h2>
        {cartItems?.map(({ product, quantity }) => {
          const { title, price, rating, image, description } = product;
          return (
            <>
              <div className="cart__item">
                <section>
                  <img loading="lazy" src={image} alt="" />
                </section>
                <section>
                  <h3> {title}</h3>
                  <StarRating rating={rating} />
                  <div className="cart__item__quantity">
                    <label htmlFor={`$quatinty_{id}`}>Qty</label>
                    <input
                      type="number"
                      name={`$quatinty_{id}`}
                      id={`$quatinty_{id}`}
                      min={0}
                      max={10}
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(e, { product, quantity })
                      }
                    />
                  </div>
                </section>
                <section className="cart__items__price">
                  <small>
                    ${" "}
                    <strong>
                      {Math.round(getSubTotal([{ product, quantity }]))}
                    </strong>
                  </small>
                </section>
              </div>
              <hr />
            </>
          );
        })}
      </section>

      <section className="cart__subtotal">
        <h2>Subtotal</h2>$ <strong>{Math.round(subTotal)}</strong>
        <p>
          <button
            className="bg-blue-600 text-white rounded-md p-2 mt-2"
            onClick={proceedToCheckout}
          >
            Buy Now
          </button>
        </p>
      </section>
    </div>
  );
}
