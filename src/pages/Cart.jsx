import React from "react";
import "./cart.css";
import { useSelector } from "../store";
import { StarRating } from "../components/StarRating";
import { getSubTotal } from "../utils";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  // const itemCount = getItemCount(cartItems);
  const subTotal = getSubTotal(cartItems);
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
                    />
                  </div>
                </section>
                <section className="cart__items__price">
                  <small>
                    $ <strong>{price}</strong>
                  </small>
                </section>
              </div>
              <hr />
            </>
          );
        })}
      </section>

      <section className="cart__subtotal">
        <h2>Subtotal</h2>
        {subTotal}
        <p>
          <button>Buy Now</button>
        </p>
      </section>
    </div>
  );
}
