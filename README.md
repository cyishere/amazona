# Amazona

Learning by doing from this tutorial: [React & Node Tutorial - Full ECommerce in 5 Hours [2020]](https://www.youtube.com/watch?v=Fy9SdZLBTOo)

- [Step 1: Make a HTML/CSS template of this app](#step-1-make-a-htmlcss-template-of-this-app)
- [Step 2: Add React Frontend](#step-2-add-react-frontend)
- [Step 3: Render products in jsx](#step-3-render-products-in-jsx)
- [Step 4: Add product details](#step-4-add-product-details)
- [Step 5: Create backend server with Node & Express](#step-5-create-backend-server-with-node--express)
- [Step 6: Fetch data from the server.](#step-6-fetch-data-from-the-server)
- [Step 7: Manage state with Redux](#step-7-manage-state-with-redux)
- [Step 8: Add Reduct to Details](#step-8-add-reduct-to-details)

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
- inplement `handleAddToCart()`;

Because of the state has 3 properties, in the reducer the initial state is `state={ product: {} }` to present object like this:

```js
state = {
  product: {},
  loading: false,
  error: "",
};
```
