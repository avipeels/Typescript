import { Express } from 'express';
import * as bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import * as Todos from '../models/todoManager';

export function setupRoutes(app: Express) {
    app.route('/').get((req, res, next) => {
        res.send('Todo API');
    })
    app.route('/todos').get((req, res, next) => {
        Todos.getTodo().then((todos) => res.json(todos));
    });
    app.route('/todos').post(jsonParser, (req, res, next) => {
        Todos.newTodo(req.body.description).then((todo) => res.json(todo));
    });
    app.route('/todos/:id').patch(jsonParser, (req, res, next) => {
        Todos.updateTodo(+req.params.id, req.body).then((todo) => res.json(todo));
    });
    app.route('/todos/:id').delete((req, res, next) => {
        Todos.deleteTodo(+req.params.id).then((todo) => res.json(todo));
    });
}