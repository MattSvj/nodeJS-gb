const express = require('express');
const fs = require('fs');

const app = express();

let views = {};

// Загрузка данных счетчика из файла
fs.readFile('views.json', 'utf8', (err, data) => {
    if (!err) {
        views = JSON.parse(data);
    }
});

app.get('/', (req, res) => {
    views['/'] = (views['/'] || 0) + 1;

    // Сохранение данных счетчика в файл
    fs.writeFile('views.json', JSON.stringify(views), 'utf8', (err) => {
        if (err) {
            console.error(err);
        }
    });

    res.send(`Главная страница. Просмотров: ${views['/']}`);
});

app.get('/about', (req, res) => {
    views['/about'] = (views['/about'] || 0) + 1;

    // Сохранение данных счетчика в файл
    fs.writeFile('views.json', JSON.stringify(views), 'utf8', (err) => {
        if (err) {
            console.error(err);
        }
    });

    res.send(`Страница "О нас". Просмотров: ${views['/about']}`);
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});