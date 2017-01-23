// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
var fs = require('fs');
console.log('From application global context');

module.exports = function() {
  // Вывод из контекста экспортируемой функции
  let foo = function () {
    debuglog = util.isFunction (foo);
    console.log('From application exported function isfunction? - ' + debuglog);
  };
//  return foo();
  setTimeout(foo, 1000);
};
