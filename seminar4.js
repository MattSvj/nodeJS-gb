const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [];

// Чтение пользователей из файла при запуске сервера
fs.readFile('users.json', 'utf8', (err, data) => {
    if (!err) {
        users = JSON.parse(data);
    }
});

// GET запрос для получения всех пользователей
app.get('/users', (req, res) => {
    res.json(users);
});

// POST запрос для создания нового пользователя
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);

    fs.writeFile('users.json', JSON.stringify(users), 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ошибка сохранения пользователя в файле');
        } else {
            res.status(201).send('Пользователь добавлен успешно');
        }
    });
});

// PUT запрос для обновления пользователя по id
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updateUser = req.body;

    const userToUpdate = users.find(user => user.id === userId);
    if (!userToUpdate) {
        return res.status(404).send('Пользователь не найден');
    }

    Object.assign(userToUpdate, updateUser);

    fs.writeFile('users.json', JSON.stringify(users), 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ошибка обновления пользователя в файле');
        } else {
            res.send('Пользователь обновлен успешно');
        }
    });
});

// DELETE запрос для удаления пользователя по id
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).send('Пользователь не найден');
    }

    users.splice(userIndex, 1);

    fs.writeFile('users.json', JSON.stringify(users), 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ошибка удаления пользователя из файла');
        } else {
            res.send('Пользователь удален успешно');
        }
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});