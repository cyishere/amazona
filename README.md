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
