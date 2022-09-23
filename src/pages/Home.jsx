import { ACTION, useDispatch } from "../store";
import { useDispatch as reduxUseDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import "./Home.css";
import { StarRating } from "../components/StarRating";
import { addProduct, fetchAllProducts } from "../features/product-slice";
import { addToCart } from "../features/cart-slice";

function Home() {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const searchTerm = searchParams.get("searchterm");
  const dispatch = useDispatch();
  const reduxDispatch = reduxUseDispatch();
  const { value: products, loading } = useSelector((state) => state.products);

  let filteredProducts = selectedCategory
    ? products.filter((prod) => prod.category === selectedCategory)
    : products;
  filteredProducts = searchTerm
    ? filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  const filteredCategories = Array.from(
    new Set(filteredProducts?.map((prod) => prod.category))
  );
  // console.log(filteredCategories);

  // async function fetchAllProducts() {
  //   const result = await fetch("https://fakestoreapi.com/products");
  //   dispatch({ type: ACTION.ADD_PRODUCTS, payload: await result.json() });
  //   // console.log("re-render triggered", products);
  // }

  if (!products?.length) {
    reduxDispatch(fetchAllProducts());
  }

  return loading ? (
    <div className="spinning-loader" />
  ) : (
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

function Category({ title, children }) {
  return (
    <>
      <div className="category__title">{title}</div>
      <div className="category__row">{children}</div>
    </>
  );
}

function Product({ product }) {
  const { image, title, rating, price, description } = product;
  const dispatch = useDispatch();
  const reduxDispatch = reduxUseDispatch();
  const addProductToCart = () => {
    dispatch({
      type: ACTION.ADD_TO_CART,
      payload: { product },
    });
    reduxDispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <div className="product ">
      <img src={image} alt={title} loading="lazy" />

      <div className="product__info">
        <h3 className="product__title line__clamp__title">{title}</h3>
        <h5 className="line__clamp">{description}</h5>
        <h5>
          <StarRating rating={rating} />
        </h5>
        <strong>${price}</strong>
        <p className="product__add" onClick={addProductToCart}>
          <button>Add to cart</button>
        </p>
      </div>
    </div>
  );
}

export default Home;
