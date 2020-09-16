/*
 * @Author: Chen Yang
 * @Date: 2020-09-15 17:27:46
 * @Last Modified by: Chen Yang
 * @Last Modified time: 2020-09-16 21:58:58
 */
// TODO:
// 1. ✅ productList;
// 2. ✅ productUpdate;
// 3. ✅ productDelete;
// 4. Authentication;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveProduct,
  listProducts,
  deleteProduct,
} from "../actions/productActions";
import Cookies from "js-cookie";

const ProductsScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const productSave = useSelector((state) => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const dispatch = useDispatch();

  const userInfo = Cookies.get("userInfo");

  useEffect(() => {
    // console.log("userInfo in sigin page:", userInfo);
    if (Object.keys(userInfo).length === 0) {
      props.history.push("/");
    }

    if (successSave) {
      setModalVisible(false);
    }

    if (successDelete) {
      document.querySelector(".notification").classList.remove("hide");
      setTimeout(() => {
        document.querySelector(".notification").classList.add("hide");
      }, 3000);
    }

    dispatch(listProducts());

    // console.log("successDelete", successDelete);
  }, [successSave, successDelete, userInfo, dispatch, props.history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const handleOpenModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        {loadingDelete && <div>Deleting...</div>}
        {errorDelete && <div className="red">{error}</div>}

        <div className="green notification hide">Delete successfully!</div>

        <button className="button primary" onClick={() => handleOpenModal({})}>
          Create Product
        </button>
      </div>

      {modalVisible && (
        <form className="form" onSubmit={handleSubmit}>
          <ul className="form-container">
            <li>
              <h2>{id ? "Update" : "Create"} Product</h2>
            </li>
            <li>
              {loadingSave && <div className="text-center">Loading</div>}
              {errorSave && <div className="text-center red">{errorSave}</div>}
            </li>
            <li>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                value={price}
                id="price"
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="image">Image</label>
              <input
                type="text"
                name="image"
                value={image}
                id="image"
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                name="brand"
                value={brand}
                id="brand"
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="countInStock">CountInStock</label>
              <input
                type="text"
                name="countInStock"
                value={countInStock}
                id="countInStock"
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="name">Category</label>
              <input
                type="text"
                name="category"
                value={category}
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </li>
            <li>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                value={description}
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </li>
            <li>
              <button type="submit" className="button primary">
                {id ? "Update" : "Create"}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setModalVisible(false);
                }}
                className="button secondary"
              >
                Back
              </button>
            </li>
          </ul>
        </form>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="6" className="red text-center">
                  {error}
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className="button primary"
                    onClick={() => handleOpenModal(product)}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="button"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsScreen;
