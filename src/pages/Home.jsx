import React, { useEffect, useState } from "react";
import "./Home.css";
import { ACTION, useDispatch, useSelector } from "../store";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const filteredProducts = selectedCategory
    ? products.filter((prod) => prod.category === selectedCategory)
    : products;
  const filteredCategories = Array.from(
    new Set(filteredProducts?.map((prod) => prod.category))
  );
  console.log(filteredCategories);

  async function fetchAllProducts() {
    const result = await fetch("https://fakestoreapi.com/products");
    dispatch({ type: ACTION.ADD_PRODUCTS, payload: await result.json() });
    console.log("re-render triggered", products);
  }

  if (!products?.length) {
    fetchAllProducts();
  }
  // async function fetchProductsByCategories(category) {
  //   const result = await fetch(
  //     `https://fakestoreapi.com/products/category/${category}`
  //   );
  //   setProducts(await result.json());
  // }

  // useEffect(() => {
  //   selectedCategory === "all"
  //     ? fetchAllProducts()
  //     : fetchProductsByCategories(selectedCategory);
  // }, [selectedCategory]);
  useEffect(() => {
    console.log("products updated", products);
  }, [products]);

  return (
    <div>
      {filteredCategories?.length
        ? filteredCategories?.map((category) => (
            <Category key={category} title={category}>
              {filteredProducts
                .filter((prod) => prod.category === category)
                ?.map((prod) => (
                  <Product key={prod.id} product={prod} />
                ))}
            </Category>
          ))
        : "No Products Found"}
    </div>
  );
}

const StarRating = ({ rating }) =>
  Array(Math.round(rating))
    .fill(0)
    .map((rating) => <span>⭐️</span>);

function Category({ title, children }) {
  return (
    <>
      <div className="category__title">{title}</div>
      <div className="category__row">{children}</div>
    </>
  );
}

function Product({ product }) {
  const { id, image, title, rating, price, description } = product;
  return (
    <div className="product " key={id}>
      <img src={image} alt="" loading="lazy" />
      <div className="product__info">
        <h3 className="product__title line__clamp__title">{title}</h3>
        <h5 className="line__clamp">{description}</h5>
        <h5>
          <StarRating rating={rating.rate} />
          out of {rating.count}
        </h5>
        <strong>${price}</strong>
      </div>
    </div>
  );
}

export default Home;
