const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = () => {
  return fetch(`${BASE_URL}/products`)
    .then((res) => res.json())
    .then((data) => data.products);
};
