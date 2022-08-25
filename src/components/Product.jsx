import React from "react";
import "./Product.css";

export default function Product({
  id,
  image,
  price,
  title,
  description,
  rating,
}) {
  const StarRating = ({ rating }) =>
    Array(Math.round(rating))
      .fill(0)
      .map((rating) => <span>⭐</span>);

  return (
    <div className="product" key={id}>
      <img src={image} alt="" loading="lazy" />
      <div className="product__info">
        <h3 className="product__title line__clamp__title">{title}</h3>
        <h5 className="line__clamp">{description}</h5>
        <h6>
          <StarRating rating={rating.rate} />
          out of {rating.count}
        </h6>
        <strong>${price}</strong>
      </div>
    </div>
  );
}
