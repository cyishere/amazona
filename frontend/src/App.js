/*
 * @Author: chen yang
 * @Date: 2020-09-13 13:13:58
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-19 13:19:53
 */
import React, { useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { listProducts } from "./actions/productActions";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import { logout } from "./actions/userActions";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

const App = (props) => {
  // const [products, setProducts] = useState([]);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  // const userLogout = useSelector((state) => state.userLogout);
  const dispatch = useDispatch();

  // const fetchData = async () => {
  //   const { data } = await axios.get("/api/products");
  //   setProducts(data);
  // };

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const handleSignout = () => {
    // Cookies.remove("userInfo");
    dispatch(logout("userInfo"));
    props.history.push("/");
  };

  // console.log("userInfo", userInfo);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              <img className="menu" src="/images/icons/menu.svg" alt="menu" />
            </button>
            <Link to="/">Amazona</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
            {userInfo.hasOwnProperty("name") ? (
              <>
                <Link to="/profile">{userInfo.name}</Link>
                <Link to="/products">Products</Link>
                <span onClick={handleSignout}>Signout</span>
              </>
            ) : (
              <Link to="/signin">Signin</Link>
            )}
          </div>
        </header>

        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <Link to="/pants">Pants</Link>
            </li>
            <li>
              <Link to="/dresses">Dresses</Link>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id">
              <ProductScreen products={products} />
            </Route>
            <Route path="/cart/:id?" component={CartScreen} />
            <Route exact path="/">
              <HomeScreen products={products} loading={loading} error={error} />
            </Route>
          </div>
        </main>

        <footer className="footer">All right reserved. </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
