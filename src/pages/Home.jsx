import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import "./Home.css";

export default function Home() {
  let [products, setProducts] = useState([]);

  async function fetchProducts() {
    const result = await fetch("https://fakestoreapi.com/products");
    setProducts(await result.json());
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="products__rows">
      {products.map(({ id, price, rating, image, title, description }) => (
        <>
          <Product
            id={id}
            price={price}
            rating={rating}
            image={image}
            title={title}
            description={description}
          />
        </>
      ))}
    </div>
  );
}
