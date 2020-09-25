'use strict';

// Массив – это упорядоченная коллекция значений. 

// Массивы являются частным случаем объектов. 
console.log(typeof []); // "object"

// Узнать является ли переменная массивом можно с помощью метода Array.isArray():
console.log(Array.isArray([])); // true

// Создание массива с помощью функци-конструктора Array. 
let empty = new Array(); 
// Создание массивов с помощью литерала массива.
let cart = []; // пустой массив

let numbers = [3, -5, 9, 1, 21]; // массив, состоящий из чисел

// При создании массивов можно вставлять в конец необязательную завершающую запятую:
let coffee = [ 'Lavazza',  'Nescafe',   'Jardin', ];

// Элементы в массиве не обязательно должны иметь одинаковый тип данных.
let customArr = [6, true, 'Строка']; 

// Определение длины массива (количества элементов) с помощью свойства length.
console.log(customArr.length); // 3

// Массив - объект, представляющий собой проиндексированный набор элементов. 

// Доступ к элементам массива осуществляется через квадратные скобки с помощью порядкового номера - индекса. 
// Массивы в JavaScript индексируются с нуля: первый элемент массива имеет индекс, равный 0, а индекс последнего элемента равен значению свойства массива length минус 1.

let cart = ['product 1', 'product 2'];
console.log(cart[0]);               // напечатает 'product 1'
console.log(cart[1]);               // напечатает 'product 2'
console.log(cart[cart.length - 1]); // напечатает 'product 2'

// Чтобы модифицировать значение в существующем массиве, просто добавьте новое значение к элементу массива с указанным индексом:
cart[1] = "extra red product"; 
cart[3] = "Blue product"; 
console.log(cart);

// В качестве значений элементов массива можно использовать выражения:
let lengthA = 7, widthA = 5;
let point = [lengthA *2, widthA + 4, -2];

// В качестве значений элементов массива могут использоваться объекты.
let cart = [ 
  {
    name: "Blue product", 
    price: 3
  },
  {
    name: "Red product", 
    price: 4
  },
  {
    name: "Green product", 
    price: 5
  },
]; 
// массив, состоящий из 3 объектов

// При копировании значения переменной, содержащей массив, мы на самом деле присваиваем ей не сам массив, а ссылку на него.

// скопируем в newCart массив cart (в результате эти две переменные будут содержать ссылку на один и тот же массив)
let newCart = cart;
console.log( cart === newCart ); // true
// добавим в массив новый элемент
newCart[3]={
  name: "Yellow product", 
  price: 7
}

console.log(cart); 

// Размер массива может увеличиваться и уменьшаться в любое время
// Длина length – не количество элементов массива, а последний индекс + 1.

cart[1000] = {};
console.log(cart[1000]);
console.log(cart.length);
// элемент массива будет пустым и вернёт undefined. 
console.log(cart[13]); // undefined

// При уменьшении length массив укорачивается. Причем этот процесс необратимый, т.е. даже если потом вернуть length обратно – значения не восстановятся:
cart.length = 2; // укоротить до 2 элементов
console.log(cart[3]);
cart.length = 1000; // вернуть length обратно, как было
console.log(cart[1000]); // undefined: значения не вернулись                         


// Оператор delete используется не для удаления элемента из массива, а для присваиванию данному элементу массива значение undefined.

delete cart[1];
console.log(cart);
console.log(1 + " элемент массива = " + cart[1]);

// Самый простой способ очистить массив - это cart.length=0.

function clearCart(){
  cart.length = 0;
  console.log("Your Cart is empty");
}

// Цикл for повторяет действия, пока не произойдёт какое-либо событие завершения цикла. Объявление оператора for выглядит следующим образом:
// for ([начало]; [условие]; [шаг]) выражения
// Выполняется выражение начало, если оно указано. Обычно инициализирует один или несколько счётчиков. Также используется для объявления переменных.
// Выполняется условие. Если условие истинно, то выполняются выражения. Если ложно, цикл for прерывается. Если условие полностью пропущено, то оно считается истинным.
// Выполняются выражения. Чтобы выполнить несколько выражений, используются блок-выражение  { ... }  для группировки выражений.
// Обновляется шаг, если он есть, а затем управление возвращается к шагу 2.

for (let i = 0; i<10;i++) {
    console.log(i);
}

for (let i = 0; i<cart.length;i++) {
  console.log(cart[i]);
}

// Цикл do...while повторяется пока заданное условие истинно:
// Do  выражения while (условие);
// выражения выполняются пока условие истинно. Если условие истинно, выражения выполняются снова. В конце каждого прохода условие проверяется. Если условие ложно, выполнение приостанавливается и управление передается выражению после do...while.
// цикл do выполнится минимум 1 раз и запускается снова, пока i меньше 5.

do {
 i += 1;
 console.log(cart[i]);
} while (i < cart.length);

// Следующий цикл while работает, пока n меньше трёх:
var n = 0;
var x = 0;
while (n < 3) {
 n++;
 x += n;
}

// Метод querySelector() возвращает первый элемент, который соответствует одному или более CSS селекторам. Если совпадения не будет, то он вернет null.
// var ele = document.querySelector(selector);

const sidebar = document.querySelector(".sidebar");
const sidebarToggle = document.querySelector(".sidebar-toggle");
const closeBtn = document.querySelector(".close-btn");
const likeMe = document/querySelector(".like-me");
const countItemsInCart = document.querySelector('.count-items-in-cart');
const clearCart = document.querySelector(".clear-cart");


// Метод querySelectorAll объекта document, и элементов-узлов, принимает строку селектора и возвращает массивоподобный объект, содержащий все найденные элементы.

let addToCart = document.querySelectorAll('.add-to-cart');

for(let i = 0; i < addToCart.length; i++){
  console.log(addToCart[i]);
  addToCart[i].style.backgroundColor = '#f4f4f4';
}

// Метод getElementsByClassName находит массив объектов определенного класса.
let addToCart = document.getElementsByClassName('add-to-cart');

for (let i = 0; i<addToCart.length; i++) {
  addToCart[i].style.backgroundColor = "#f0"+(10*i)+"0f";
}
