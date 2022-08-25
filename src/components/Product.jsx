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
      .map((rating) => <span>⭐️</span>);

  return (
    <div className="product" key={id}>
      <img src={image} alt="" loading="lazy" />
      <h3>{title}</h3>
      <h5>{description}</h5>
      <h6>
        <StarRating rating={rating.rate} />
        out of {rating.count}
      </h6>
      <strong>${price}</strong>
    </div>
  );
}
