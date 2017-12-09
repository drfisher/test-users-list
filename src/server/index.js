'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const formData = require("express-form-data");
const path = require('path');
const users = require('./users');
const tools = require('./tools');

const pages = tools.createPages(users, 20);
const app = express();

app.use(bodyParser.json());
app.use(formData.parse({autoFiles: true}));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'no-cache');
	next();
});

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.get('/public/:file', (req, res) => {
	res.sendFile(path.resolve(__dirname, `../../public/${req.params.file}`));
});

app.get('/api/users', (req, res) => {
	res.send(pages[0]);
});

app.get('/api/users/:page', (req, res) => {
	const requestedPageNum = (+req.params.page || 0);
	const page = pages[requestedPageNum - 1];
	page ? res.send(page) : res.sendStatus(404);
});

app.post('/api/users/:id', (req, res) => {
	// Don't save but send response as if user was saved
	// todo: add user info to the response
	const matchedUser = users.find(user => user.id === req.params.id);
	Object.assign(matchedUser, req.body);
	res.send({ success: 1, user: matchedUser });
});

app.get('/api/user/:id', (req, res) => {
	const matchedUser = users.find(user => user.id === req.params.id);
	matchedUser ? res.send(matchedUser) : res.sendStatus(404);
});

app.listen(8080, 'localhost');
