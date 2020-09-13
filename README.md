# Amazona

Learning by doing from this tutorial: [React & Node Tutorial - Full ECommerce in 5 Hours [2020]](https://www.youtube.com/watch?v=Fy9SdZLBTOo)

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

And add this script to `package.json` file, make sure "`nodemon` only watch the `/backend` directory and `execute` the following command.

```json
{
  "scripts": {
    "server": "nodemon --watch backend --exec babel-node backend/server.js"
  }
}
```
