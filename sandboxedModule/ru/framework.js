// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
const fs = require('fs'),
    vm = require('vm'),
    util = require('util');

//обертка console.log()

let Logger = {};
Logger.log = function () {
    if (console && console.log) {
        try {
            let now = new Date();
            console.log.apply(console, [fileName + ' ' + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()+":"+ now.getMilliseconds()].concat([].slice.call(arguments)));
        } catch (e) {
            console.log(Array.slice(arguments))
        }
    }
};
//обертка required
let LoggerReq = function (name) {
    if (require) {
        try {
            let now = new Date();
            console.log( name + ' ' + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()+":"+ now.getMilliseconds());
        } catch (e) {
            console.log(Array.slice(arguments))
        }
    }
};


// Читаем исходный код приложения из файла - вызов node framework <applicationName>
let fileName = '';
if (process.argv[2]) {
    fileName = process.argv[2];
}
// Создаем контекст-песочницу, которая станет глобальным контекстом приложения
let context = {
                module: {},
                console: Logger,
                setTimeout: setTimeout,
                setInterval: setInterval,
                util: util,
                require: LoggerReq

};
context.global = context;
let sandbox = vm.createContext(context);

fs.readFile(fileName, function(err, src) {
  // Тут нужно обработать ошибки

  // Запускаем код приложения в песочнице
  let script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  sandbox.module.exports();
  // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  // сохранить в кеш, вывести на экран исходный код приложения и т.д.
});
