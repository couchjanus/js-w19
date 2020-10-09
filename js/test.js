'use strict';

if (window.sessionStorage && window.localStorage) {
  // объекты sessionStorage и localstorage поддерживаются
  console.log('объекты sessionStorage и localstorage поддерживаются');
} else {
  // объекты sessionStorage и localstorage не поддерживаются
  console.log('объекты sessionStorage и localstorage не поддерживаются');
}

function supports_html_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
      return false;
    }
}

document.addEventListener('DOMContentLoaded', (()=>{
  supports_html_storage()?console.log('объекты sessionStorage и localstorage поддерживаются'):console.log('объекты sessionStorage и localstorage не поддерживаются');

  // Получить значение по ключу Storage.getItem(Ключ)  
  console.log('Получить имя n-ного ключа в Storage: ', localStorage.getItem('basket'));
  // Добавление  ключа в Storage или обновление его значение, если ключ уже существовал.
  localStorage.setItem('basket', 'true');
  // Получить значение по ключу Storage.getItem(Ключ)  
  console.log('Получить имя n-ного ключа в Storage: ', localStorage['basket']);
  // Добавление ключа в Storage или обновление его значение, если ключ уже существовал.
  localStorage['basket']= 'true';

  try { 
      localStorage.setItem('ключ', 'значение');
  } catch (e) {
      if (e == QUOTA_EXCEEDED_ERR) {
            console.log('Превышен лимит');  
      }
  }      

  console.log(localStorage.length);

  // LocalStorage имеет всего 5 метода.
    
  // Получить имя n-ного ключа в Storage
  console.log('Получить имя n-ного ключа в Storage: ', localStorage.key(0));

  //  Получить значение ключа.
  console.log('Получить значение ключа localStorage.getItem("basket"): ', localStorage.getItem('basket'));
  // Получить значение ключа.
  console.log('Получить значение ключа localStorage["basket"]: ', localStorage['basket']);
      
  // Добавление  ключа в Storage или обновление его значение, если ключ уже существовал.
  localStorage.setItem('basket', 'true');
  console.log('Добавление  ключа в Storage или обновление его значение, если ключ уже существовал: ', localStorage.getItem('basket'));
  // Сохранение значения
  localStorage["Ключ"] = "Значение";

  // Storage.removeItem(Ключ) Удалит этот ключ из Storage.
  localStorage.removeItem('basket');
  console.log('Удалит этот ключ из Storage: ', localStorage.getItem('basket'));

  // При вызове метод Storage.clear() удалит все ключи из Storage.
  localStorage.clear();
  console.log('localStorage.length = ', localStorage.length);

})());


// function initStorage() {
//     try {
//         localStorage.getItem("basket") ?
//         localStorage.getItem("basket") :
//         localStorage.setItem("basket", “cart item”);
//     } catch (e) {
//         if (e == QUOTA_EXCEEDED_ERR) {
//             console.log('Превышен лимит localStorage'); 
//         }
//     }
//  }

// if (initStorage()) {
//   console.log(typeof localStorage["basket"]);
// }

// // Удаление значения
// localStorage.removeItem("Ключ")
 
// // Удаление значения
// delete localStorage["Ключ"]

// // Очистка всего хранилища
// localStorage.clear()
// localStorage.setItem('myKey', 'myValue');

// var localValue = localStorage.getItem('myKey');
// localStorage.removeItem("myKey"); // удаляем
// localStorage.clear() // очищаем все хранилище

// // То же самое, только с квадратными скобками:
// localStorage["Ключ"] = "Значение" //установка значения
// localStorage["Ключ"] // Получение значения
// delete localStorage["Ключ"] // Удаление значения
    
// // Проверка существует ли в массиве какой-нибудь элемент с elem.id = id.
// let id = 1;

// let exist = tmpProducts.some(elem => {
//   return elem.id === id;
// });

// if(tmpProducts.length > 0){
//   let exist = tmpProducts.some(elem => {
//     return elem.id === prod.id;
//   });
// }

// console.log(tmpProducts);

// // Пример: проверка значений элементов массива
// function isBiggerThan10(element, index, array) {
//   return element > 10;
// }
// [2, 5, 8, 1, 4].some(isBiggerThan10);  // false
// [12, 5, 8, 1, 4].some(isBiggerThan10); // true

// // Стрелочные функции предоставляют более краткий синтаксис для подобных проверок.
// [2, 5, 8, 1, 4].some(elem => elem > 10);  // false
// [12, 5, 8, 1, 4].some(elem => elem > 10); // true
