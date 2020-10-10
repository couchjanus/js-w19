'use strict';

const products = [
  {
      id:1,
      image:"images/product-1.jpg",
      name:"Kui Ye Chen’s AirPods",
      price:123,
      category:"electronics"
  },
  {
      id:2,
      image:"images/product-2.jpg",
      name:"Air bag",
      price:121,
      category:"bags"
  },
  {
      id:3,
      image:"images/product-3.jpg",
      name:"Men's T-Shirt",
      price:223,
      category:"clothes"
  },
  {
      id:4,
      image:"images/product-4.jpg",
      name:"Kui Ye watch",
      price:321,
      category:"watches"
  },
  {
      id:5,
      image:"images/product-5.jpg",
      name:"Red digital smartwatch",
      price:111,
      category:"electronics"
  },
  {
      id:6,
      image:"images/product-6.jpg",
      name:"Nike air max 95",
      price:222,
      category:"shoes"
  },
  {
      id:7,
      image:"images/product-7.jpg",
      name:"Joemalone Women prefume",
      price:13,
      category:"cosmetics"
  },
  {
      id:8,
      image:"images/product-8.jpg",
      name:"Apple Watch",
      price:333,
      category:"watches"
  },
];

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

console.log(
  products.sort(compareValues('price', 'desc'))
);
