'use strict';

// Свойство HTMLElement.dataset предоставляет доступ как для чтения, так и для изменения пользовательских дата-атрибутов custom data attributes (data-*) , установленных у элемента. 
// Свойство dataset доступно только для чтения. 
// Для записи должны использоваться  его свойства, которые представлены data-атрибутами. 
// HTML data-атрибут и соответствующий ему DOM-dataset.property не имеют одно и то же имя, но они всегда похожи.
// Имя пользовательского дата атрибута в HTML начинается с "data-". Оно может состоять из букв, цифр и символов: дефис-минус (-, U+002D), точка (.), двоеточие (:), подчеркивание (_). Имя НЕ МОЖЕТ включать в себя заглавные буквы.

// Имя пользовательского дата-атрибута в Javascript - это имя того же атрибута в HTML, но с использованием нотации camelCase и без дефисов, точек и т.д.

function createProduct(data) {
    return `
    <div class="col-xl-3 col-lg-4 col-sm-6">
           <div class="product text-center" data-id="${data.id}">
               <div class="position-relative mb-3">
                   <a class="d-block" href="detail.html">
                       <img class="img-fluid w-100 product-img" src="${data.image}" alt="...">
                    </a>
                    <div class="product-overlay">${makeLiGroup(overlayGroup, 'mb-0 list-inline')}</div>
               </div>
               <h6><a class="reset-anchor product-name" href="detail.html">${data.name}</a></h6>
               <p class="small text-muted product-price" data-price="${data.price}">${data.price}</p>
           </div>
       </div>`;
} 

// В программировании анонимная функция (функциональный литерал, лямбда-абстракция или лямбда-выражение) - это определение функции, не привязанное к идентификатору.
// У функции в обработчике события нет имени, она анонимна.
document.getElementById("button").addEventListener("click", function (){
})
// Анонимные функции создаются и сразу же запускаются, так как находятся внутри колбэк функций. Именованные функции объявляются, а анонимные создаются при помощи оператора function. Анонимные функции могут выступать в качестве значения переменной (функциональные выражения):
let look = function() {}
// К таким функции можно обращаться по переменной, но сама функция остается анонимной. В качестве значения переменной также можно указать именованную функцию.

// Стрелочные функции имеют более короткий синтаксис по сравнению с функциональными выражениями. 
// Стрелочные функции всегда анонимные.
//   (param1, param2, …, paramN) => { statements }
//   (param1, param2, …, paramN) => expression
  // эквивалентно: (param1, param2, …, paramN) => { return expression; }
  // Круглые скобки не обязательны для единственного параметра:
//   (singleParam) => { statements }
//   singleParam => { statements }
    // Функция без параметров нуждается в круглых скобках:
//   () => { statements }
//   () => expression 
  // Эквивалентно: () => { return expression; }

// краткий синтаксис, неявно возвращает результат
let func = x => x * x;  
// блочный синтаксис, явно возвращает результат
let func = (x, y) => { 
    return x + y; 
}; 

let empty = () => {}; // Пустая стрелочная функция возвращает undefined
// Возвращаемые объектные строки (литералы) используют сокращённый синтаксис: 
// params => {object:literal} будет работать не так, как ожидается.
var func = () => { foo: 1 }; // Вызов func() возвращает undefined!
var func = () => { foo: function() {} }; // SyntaxError: function statement requires a name

// Это происходит потому что код в скобках ({}) распознаётся как цепочка выражений (т.е. foo трактуется как наименование, а не как ключ в объектной строке). 
// Не забывайте оборачивать скобками объектные строки. var func = () => ({ foo: 1 });

// Когда возвращаете литеральное выражение объекта, заключите тело в скобки
  params => ({foo: bar})
(() => 'foobar')(); // Вернёт "foobar"/ (Это Immediately Invoked Function Expression
var simple = a => a > 15 ? 15 : a;
simple(16); // 15
let max = (a, b) => a > b ? a : b;
// 

let cart = [];
const cartItems = document.querySelector(".cart-items");
const clearCart = document.querySelector(".clear-cart");

function addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.setAttribute('id', item.id);
    div.innerHTML = `<!-- cart item -->
        <div class="picture product-img">
            <img src="${item.image}" alt="${item.name}" class="img-fluid w-100">
        </div>
        <div class="product-name p-auto">${item.name}</div>
        <div class="remove-btn text-right">
            <a class="reset-anchor m-auto" href="#">
                <i class="fas fa-trash-alt" data-id=${item.id}></i>
            </a>
        </div>
        <div class="quantity">
            <div class="border d-flex justify-content-around mx-auto">
                <i class="fas fa-caret-left inc-dec-btn" data-id=${item.id}></i>
                <span class="border-1 p-1 amount">${item.amount}</span>
                <i class="fas fa-caret-right inc-dec-btn" data-id=${item.id}></i>
            </div>
        </div>
        <div class="price">
            $<span class="product-price">${item.price}</span>
        </div>
    `;
    cartItems.appendChild(div);
}

// sread
// Spread syntax расширяет доступные для итерации элементы (массивы и строки) для функций, где ожидаемое количество аргументов для вызовов функций равно нулю или больше нуля, для элементов (литералов массива), для выражений объектов, где количество пар ключ-значение должно быть равно нулю или больше (для объектных литералов)
// Для вызовов функций: myFunction(...iterableObj);
// Для литералов массива или строк: [...iterableObj, '4', 'five', 6];
// Для литералов объекта (ECMAScript 2018): let objClone = { ...obj };
  // Поддерживаются Rest параметры и параметры по умолчанию
//   (param1, param2, ...rest) => { statements }
//   (param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }
    // Деструктуризация тоже поддерживается
//   var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
//   f();  // 6


// Деструктуризация означает извлечение данных из массивов или объектов. С помощью деструктуризации можно разбить сложный объект или массив на более мелкие части. Деструктуризация также дает возможность извлекать сразу несколько данных из объекта или массива, а также предоставляет возможность установить значение свойства по умолчанию, если оно еще не установлено.
// Деструктуризация массивов:
const scores = [85, 90, 74];
const [maths, geography, biology] = scores;
console.log(maths);
console.log(geography);
console.log(biology);
// Используя простой литерал массива, можно деструктурировать массив. Элементы массива сохраняются в локальных переменных. Каждая из локальных переменных сопоставляется с соответствующим элементом массива.

// Синтаксис rest оператора выглядит так же, как и spread оператор, однако он используется для деструктуризации массивов и объектов. Фактически, rest оператор противоположен spread оператору: последний раскладывает массив на элементы, тогда как первый собирает много элементов в один. 

function addToCarts() {
    const addToCartButtons = [...document.querySelectorAll(".add-to-cart")];
    addToCartButtons.forEach(button => {
        button.addEventListener("click", event => {
          // add to cart
          let cartItem = { ...getProduct(event.target.closest('.product').getAttribute('data-id')), amount: 1 };
          cart = [...cart, cartItem];
          // add to DOM
          addCartItem(cartItem);
        });
    });
}

// Метод filter() позволяет создать новый массив, элементы которого соответствуют условию заданному в пререданной функции.
// Метод find()  возвращает значение первого элемента в массиве, который соответствует условию в переданной функции, или undefined, если ни один элемент не удовлетворяет условию в переданной функции.
// операции над массивами:
let arr = [5, 6, 13, 0, 1, 18, 23];
let zero = arr.find(item => item == 0);
let even = arr.filter(v => v % 2 == 0);


function getProduct(id) {
    return products.find(product => product.id === +(id));
}

function clear() {
    cart = [];
    while (cartItems.children.length > 0) {
        cartItems.removeChild(cartItems.children[0]);
    }
}

// Метод filter() не изменяет массив, для которого он был вызван.
// Диапазон элементов, обрабатываемых методом filter(), устанавливается до первого вызова функции callback. Элементы, добавленные в массив после начала выполнения метода filter(), не будут обрабатываться функцией callback. Если существующие элементы массива изменятся, значения, переданные в функцию callback, будут значениями на тот момент времени, когда метод filter() посетит их; удалённые элементы обрабатываться не будут.
// Основная идея метода filter():
// - методу filter() передается функция, которая:
//    - получает текущий элемент фильтруемого массива данных;
//    - реализует логику обработки элемента;
//    - возвращает логическое значение;
// - если функция вернула истину, то текущий элемент будет добавлен в новый массив;
// - иначе элемент пропускается;
// - метод возвращает новый массив с отфильтрованными данными.

const filterItem = (cart, curentItem) => cart.filter(item => item.id !== +(curentItem.dataset.id));

const findItem = (cart, curentItem) => cart.find(item => item.id === +(curentItem.dataset.id));

function renderCart() {

    clearCart.addEventListener("click", () => {
      clear();
    });
    
    cartItems.addEventListener("click", event => {
      if (event.target.classList.contains("fa-trash-alt")) {
        cart = filterItem(cart, event.target);
        cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
      } else if (event.target.classList.contains("fa-caret-right")) {
        let tempItem = findItem(cart, event.target);
        tempItem.amount = tempItem.amount + 1;
        event.target.previousElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-caret-left")) {
        let tempItem = findItem(cart, event.target);
        tempItem.amount = tempItem.amount - 1;
        if (tempItem.amount > 0) {
        event.target.nextElementSibling.innerText = tempItem.amount;
        } else {
          cart = filterItem(cart, event.target);
          cartItems.removeChild(event.target.parentElement.parentElement.parentElement);
        }
      }
    });
  }
      
     