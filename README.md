# Amazona

### To Do:

- [ ] ❗❗❗The validation after sigin & logout have some problems...
- [ ] Logout;
- [ ] Double check the `passconf`;
- [ ] Encrypt password;

Learning by doing from this tutorial: [React & Node Tutorial - Full ECommerce in 5 Hours [2020]](https://www.youtube.com/watch?v=Fy9SdZLBTOo)

- [Step 1: Make a HTML/CSS template of this app](#step-1-make-a-htmlcss-template-of-this-app)
- [Step 2: Add React Frontend](#step-2-add-react-frontend)
- [Step 3: Render products in jsx](#step-3-render-products-in-jsx)
- [Step 4: Add product details](#step-4-add-product-details)
- [Step 5: Create backend server with Node & Express](#step-5-create-backend-server-with-node--express)
- [Step 6: Fetch data from the server.](#step-6-fetch-data-from-the-server)
- [Step 7: Manage state with Redux](#step-7-manage-state-with-redux)
- [Step 8: Add Reduct to Details](#step-8-add-reduct-to-details)
- [Step 9: Add shopping cart sreen](#step-9-add-shopping-cart-sreen)
- [Step 10: Connect to MongoDB](#step-10-connect-to-mongodb)
- [Step 11: Signin and register user](#step-11-signin-and-register-user)
- [Step 12: Manage Products](#step-12-manage-products)
- [Step 13: Checkout Wizard](#step-13-checkout-wizard)

## Step 1: Make a HTML/CSS template of this app.

On the branch "html-template";

## Step 2: Add React Frontend

On the branch "add-frontend" by using `create-react-app`;

## Step 3: Render products in jsx

On the branch "render-products";

## Step 4: Add product details

On the branch "product-details";

When use this syntax in the parent:

```jsx
<Route path="/product/:id" component={ProductScreen} />
```

The child could get a whole `props`:

```jsx
const ProductScreen = (props) => {
  const id = props.match.params.id;
  // ...
};
```

But, this method can not pass the `data`. So there's another one:

```jsx
<Route path="/product/:id">
  <ProductScreen data={data} />
</Route>
```

Then the child could only get the `data` in the `props` without other default properties, and we use `useParams` from `react-router-dom` to get the id:

```jsx
const ProductScreen = ({ data }) => {
  const { id } = useParams();
  // ...
};
```

## Step 5: Create backend server with Node & Express

On the branch "node-express-server";

Use `babel` to make ES6 available in Node. Because in this tutorial we use ES6 in Node.

```bash
yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env
```

then add the `.babelrc` file at the root of directory.

```
// ./.bablerc
{
  "presets": [
    [
      "@babel/preset-node"
    ]
  ]
}
```

And add this script to `package.json` file, make sure "`nodemon` only watch the `/backend` directory and `execute` the following command."

```json
{
  "scripts": {
    "server": "nodemon --watch backend --exec babel-node backend/server.js"
  }
}
```

## Step 6: Fetch data from the server.

On the branch "fetch-server-data";

Use React Hook & `axios`. First, set proxy in `/frontend/package.json`.

## Step 7: Manage state with Redux

On the branch "manage-state-with-redux";

### 1) Create `store.js`

- use `combineReducers` to define reducer;
- use `compose (composeEnhancer)` to call the Chrome Devtools and `thunk` middleware which allows us to use async operations in actions;
- use `createStore` to create `store`;

### 2) Add highest wrapper `<Provider store={store} />` in `index.js`

### 3) Define the reducers

Create a reducer function in `./reducers/productReducers.js` with the name as same as we used in the `combineReducers` of the `store.js` file;

And with 2 parameters, the first is the initial state, the 2nd is the `action`; then use `switch` method to execute actions.

### 4) Define the actions

Create the actions in `./actions/productActions.js`, with the function named `listProducts` which could describe the action; then use `dispatch` to dispatch the actions in the reducer (`./reducers/productReducers.js`).

### 5) Fetch products by using Redux state

- Get rid of `[products, setProducts]`;
- use `useSelector` to get `productList` which we defined in the `store` (`store.js`);
- destruct the main properties in the `productList` which are `products, loading, error`; (The properties' are defined in the reducer.)
- use `useDispatch` in the `useEffect` to dispatch the **action** which defined in the `productActions.js` file to get the products data;

**[NOTE]** Don't forget to define the action types in `./constants/productConstants.js`.

## Step 8: Add Reduct to Details

On the branch "add-redux-to-details";

- refactor product details to Redux version;
- implement `handleAddToCart()`;

Because of the state has 3 properties, in the reducer the initial state is `state={ product: {} }` to present object like this:

```js
state = {
  product: {},
  loading: false,
  error: "",
};
```

## Step 9: Add shopping cart sreen

The `?` in "path" means the "id" is optional.

```jsx
<Route path="/cart/:id?" component={CartScreen} />
```

In the cart action bar, for some reason the `item.qty` in the code below in **NOT** a number, so I put a `+` symbol in front it to convert it to **number**.

```js
cartItems.reduce((sum, item) => sum + +item.qty, 0);
```

We need to save items in the cart to the cookies, so we when refresh the page, the items in the cart will remain the same as before.

```bash
yarn add js-cookie
```

## Step 10: Connect to MongoDB

Add models and routes in backend as always.

## Step 11: Signin and register user

**Need to set cooke.**

Set `JWT_SECRET` in `.env`.

- Define functions in UI component, in the functions dispatch the "action";
- Define the actions;
- Define the reducers;
- Add the reducers to the `store`;

Don't forget to add & change these in `store.js`:

```js
const userInfo = Cookie.getJSON("userInfo") || [];

const initialState = { cart: { cartItems }, userSignin: { userInfo } };
```

## Step 12: Manage Products

On the branch "manage-products";

If the method has parameters, when you call it directly in the `onClick` or some other handlers, it will automatically be called after the component render. So when we call it, we need to put it in a **callback function**, like this:

```jsx
const handleSubmit = (product) => {
  console.log(product);
};

return <button onClick={() => handleSubmit(product)}>Submit</button>;
```

**ATTENTION**

We NEED to put `successSave` and `successDelete` in the `useEffect`'s 2nd array parameter, then after create/update/delete product, the view will automatically update.

```js
useEffect(() => {
  if (successSave) {
    setModalVisible(false);
  }

  dispatch(listProducts());
}, [successSave, successDelete]);
```

Also add authentication methods as middlewares in the `./backend/util.js`, and put them as parameters in the routes when you need authentication.

```js
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  // ...
}
```

## Step 13: Checkout Wizard

On the branch "checkout-wizard";

Refactor the structor of frontend.
