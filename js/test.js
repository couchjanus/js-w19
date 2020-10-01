'use strict';

// Метод createElement создает элемент html

{/* 
  <div class="cart-item">

    <div class="picture product-img">
      <img src="images/product-3.jpg" alt="name" class="img-fluid w-100">
    </div>
    
    <div class="product-name p-auto">Product name</div>
    <div class="remove-btn text-right">
      <a class="reset-anchor m-auto" href="#">
        <i class="fas fa-trash-alt"></i>
      </a>
    </div>
    <div class="quantity">
      <div class="border d-flex justify-content-around mx-auto">
        <i class="fas fa-caret-left inc-dec-btn"></i>
        <span class="border-1 p-1 amount">1</span>
        <i class="fas fa-caret-right inc-dec-btn"></i>
      </div>
    </div>
    <div class="price">
      $<span class="product-price">123</span>
    </div>
  </div> 
*/}

let cartItem = document.createElement("div");

const picture = document.createElement('div');
const imgFluid = document.createElement('img');
const productName = document.createElement('div');



const price = document.createElement('div');
const productPrice = document.createElement('span');

// createTextNode(text): создает и возвращает текстовый узел. 
let productText = document.createTextNode("Joemalone Women prefume");
// можем воспользоваться свойством textContent:
productPrice.textContent = "$25";

// Метод appendChild добавляет элемент в конец списка дочерних элементов родителя. 
// Если элемент уже существует он удаляется из текущего родителя и вставляется заново.

productName.appendChild(productText);

imgFluid.setAttribute('src', "images/product-3.jpg");
imgFluid.setAttribute('alt', "Joemalone Women prefume");
imgFluid.className = "img-fluid w-100";

picture.appendChild(imgFluid);
price.appendChild(productPrice);

cartItem.appendChild(picture);
cartItem.appendChild(productName);
cartItem.appendChild(price);

document.querySelector('.cart-items').appendChild(cartItem);


// Метод parent.insertBefore(узел, место вставки)
// узел - Ссылка на вставляемый узел.
// место вставки - Ссылка на элемент, перед которым необходимо вставить новый узел. Если аргумент равен null, то узел вставляется в конец родителя (то есть сработает, как appendChild()).
// Данный метод позволяет вставить элемент в любое место, а не только в конец родителя.

const quantity = document.createElement('div');
const border = document.createElement('div');
const caretLeft = document.createElement('i');
const amount = document.createElement('span');
const caretRight = document.createElement('i');

quantity.className = "quantity";

// parent
border.className = "border d-flex justify-content-around mx-auto";
amount.className = "border-1 p-1 amount";
amount.textContent = 1;
border.appendChild(amount);

caretLeft.className = "fas fa-caret-left inc-dec-btn";
caretRight.className = "fas fa-caret-right inc-dec-btn";

// Вставка в самое начало родителя, то есть перед первым узлом
border.insertBefore(caretLeft, border.firstChild);

// Вставка в конец родителя, аналогично appendChild()
// border.appendChild(caretRight);
border.insertBefore(caretRight, null);

quantity.appendChild(border);


// Добавить новый узел в документ можно простой вставкой HTML-кода в виде строки. Для этого используется метод insertAdjacentHTML().
// parent.insertAdjacentHTML(место вставки, HTML-код)
// место вставки - Позиция, куда необходимо вставить код. Это место указывается относительно самого элемента и может иметь одно из следующих значений:
// beforebegin - непосредственно перед открывающим тегом.
// afterbegin - сразу после открывающего тега.
// beforeend - непосредственно перед закрывающим тегом.
// afterend - сразу после закрывающего тега.

let parent = document.querySelector('.cart-item');

parent.querySelector('.product-name').insertAdjacentHTML('beforeend', '<div class="remove-btn text-right"><a class="reset-anchor m-auto" href="#"><i class="fas fa-trash-alt"></i></a></div>');


// Метод replaceChild() удаляет один узел и вставляет на его место новый.
// parent.replaceChild(новый узел, старый узел)
// новый узел - Ссылка на вставляемый узел.
// старый узел - Ссылка на удаляемый узел.

// let li1 = document.querySelector('li.list-inline-item'); // ссылка на 1 существующий элемент
// console.log(li1);

// let li2 = li1.nextSibling; // ссылка на 2 существующий элемент
// console.log(li2);

// // Метод возвращает ссылку на удаленный узел.
// let replaceLi = ul.replaceChild(li1, li2); // заменяем элемент li1 на li2

// ul.insertBefore(replaceLi, li1);


// Браузер содержимое тега <script> считает простым текстом, а так как в атрибуте type у него указан неизвестный ему MIME-тип, то интерпретировать или отображать он его не станет. 
//<script id="template-item" type="text/template">
// </script>

// Содержимое тега script можно получить после загрузки документа, обратившись к нему по id.

// let templateSource = document.getElementById("template-item").innerHTML;      

// const section = document.createElement("section");
// section.classList = "text-center border border-light p-5 my-3";

// section.innerHTML = templateSource;
// document.querySelector('.container').appendChild(section);


let content = document.getElementById("cartItem").content;  
// document.querySelector('.cart-items').appendChild(content);

// Для использования template его необходимо активировать. 

let addToCart = document.querySelector('.add-to-cart');

addToCart.addEventListener('click', function(){
    document.querySelector('.cart-items').appendChild(content);
});

// Самый простой способ активации заключается в создании deep copy свойства .content с использованием метода  document.importNode().  Свойство .content является read-only.

// addToCart.addEventListener('click', function(){
//     document.querySelector('.cart-items').append(document.importNode(content, true));
// });


// const product = {
//   id:1,
//   image:"images/product-1.jpg",
//   name:"Kui Ye Chen’s AirPods",
//   price:123
// };

// for (let key in product) { 
//   console.log(key + ': ' + product[key]);
// }

// products.forEach(function(item) {
//   console.log(item);
// });
 

// // Чтобы создать шаблонную строку, необходимо использовать символ обратной кавычки (`):

// let newString = `A string`;

// // Шаблонные строки позволяют записывать значения переменных на нескольких строках. 
// // В отличие от обычных строк, в шаблонных строках можно использовать символы переноса строк:

// let listInline= `
// <ul class="mb-0 list-inline">
//   <li class="list-inline-item m-0 p-0">
//       <a class="btn btn-sm btn-outline-dark" href="#"><i class="far fa-heart"></i></a>
//   </li>
//   <li class="list-inline-item m-0 p-0">
//       <a class="btn btn-sm btn-dark add-to-cart" href="#">Add to cart</a>
//   </li>
//   <li class="list-inline-item mr-0">
//       <a class="btn btn-sm btn-outline-dark" href="#"><i class="fas fa-expand"></i></a>
//   </li>
// </ul>
// `;
// // Все пробельные символы в шаблонной строке, включая переносы строк и отступы, включаются «как есть» в результат.

// let productHtml = `
// <div class="col-xl-3 col-lg-4 col-sm-6">
// <div class="product text-center">
//   <div class="position-relative mb-3">

//       <a class="d-block" href="detail.html"><img class="img-fluid w-100 product-img"
//               src="images/product-1.jpg" alt="..."></a>
//       <div class="product-overlay">
//           <ul class="mb-0 list-inline">
//               <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark"
//                       href="#"><i class="far fa-heart"></i></a></li>
//               <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark add-to-cart"
//                       href="#">Add to cart</a></li>
//               <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#"><i
//                           class="fas fa-expand"></i></a>
//               </li>
//           </ul>
//       </div>
//   </div>
//   <h6> <a class="reset-anchor product-name" href="detail.html">Kui Ye Chen’s AirPods</a></h6>
//   <p class="small text-muted product-price">$250</p>
// </div>
// </div>
// `;

// // Выражения: ${expression}. 

// // Синтаксис ${} позволяет вставить в скобки выражение, которое передаст свое значение. Можно использовать обычную строку.
// console.log(`${"Kui Ye Chen’s AirPods"}`);

// let name = "Kui Ye Chen’s AirPods";
// console.log(`${name}`);

// // В выражениях можно проводить любые математические операции.
// let price = 19.99;
// let q = 5;
// let prod = `The price of ${name} is ${price * q}`;

// // Выражения можно использовать и с более сложными объектами.

// let makeProduct = {
//   id:1,
//   image:"images/product-1.jpg",
//   name:"Kui Ye Chen’s AirPods",
//   price:123,
//   renderProduct() {
//       return `
//       <div class="col-xl-3 col-lg-4 col-sm-6">
//           <div class="product text-center">
//               <div class="position-relative mb-3">
//                   <a class="d-block" href="detail.html">
//                       <img class="img-fluid w-100 product-img" src="${this.image}" alt="...">
//                       </a>
//                   <div class="product-overlay">
//                       <ul class="mb-0 list-inline">
//                           <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark"
//                                   href="#"><i class="far fa-heart"></i></a></li>
//                           <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark add-to-cart"
//                                   href="#">Add to cart</a></li>
//                           <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#"><i
//                                       class="fas fa-expand"></i></a>
//                           </li>
//                       </ul>
//                   </div>
//               </div>
//               <h6> <a class="reset-anchor product-name" href="detail.html">${this.name}</a></h6>
//               <p class="small text-muted product-price">${this.price}</p>
//           </div>
//       </div>
//       `;
//   }
// };

// console.log(makeProduct.renderProduct());

//   // на основе шаблонных строк можно делать HTML шаблоны.
//   let data = {
//       id:1,
//       image:"images/product-1.jpg",
//       name:"Kui Ye Chen’s AirPods",
//       price:123
//   };
  
//   // создадим разметку
//   function createMarkup(data) {
//    return `
//    <div class="col-xl-3 col-lg-4 col-sm-6">
//           <div class="product text-center">
//               <div class="position-relative mb-3">
//                   <a class="d-block" href="detail.html">
//                       <img class="img-fluid w-100 product-img" src="${data.image}" alt="...">
//                       </a>
//                   <div class="product-overlay">
//                       <ul class="mb-0 list-inline">
//                           <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark"
//                                   href="#"><i class="far fa-heart"></i></a></li>
//                           <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark add-to-cart"
//                                   href="#">Add to cart</a></li>
//                           <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#"><i
//                                       class="fas fa-expand"></i></a>
//                           </li>
//                       </ul>
//                   </div>
//               </div>
//               <h6> <a class="reset-anchor product-name" href="detail.html">${data.name}</a></h6>
//               <p class="small text-muted product-price">${data.price}</p>
//           </div>
//       </div>
//    `
//   }

//   // document.querySelector('.row').innerHTML = createMarkup(data);
  
//   // let res = '';
//   // products.forEach(function(item) {
//   //     res+=createMarkup(item);
//   // });
//   // document.querySelector('.row').innerHTML = res;

  
//   function socIcon(className, icon, capture='') { 
//       return `<li class="list-inline-item m-0 p-0 ${className}"><a class="btn btn-sm btn-outline-dark"
//       href="#"><i class="far ${icon}"></i> ${capture}</a></li>
//      `; 
//   }
//   // let icon = 'fa-heart';
//   // console.log(`Something is ${socIcon('fa-heart')}.`);

//   function createNewMarkup(data) {
//       return `
//       <div class="col-xl-3 col-lg-4 col-sm-6">
//              <div class="product text-center">
//                  <div class="position-relative mb-3">
//                      <a class="d-block" href="detail.html">
//                          <img class="img-fluid w-100 product-img" src="${data.image}" alt="...">
//                          </a>
//                      <div class="product-overlay">
//                          <ul class="mb-0 list-inline">
//                          ${socIcon('like-this','fa-heart', )}
//                          ${socIcon('add-to-cart','fa-shopping-cart', 'Add to cart')}
//                          ${socIcon('view-this','fa-expand')}
//                          </ul>
//                      </div>
//                  </div>
//                  <h6> <a class="reset-anchor product-name" href="detail.html">${data.name}</a></h6>
//                  <p class="small text-muted product-price">${data.price}</p>
//              </div>
//          </div>
//       `
//      }
 
//   document.querySelector('.row').innerHTML = createNewMarkup(data);
