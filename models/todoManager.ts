import { Todo, TodoStatus } from "./todo";
import * as fs from 'fs';
import { resolve } from "path";
import { rejects } from "assert";

const dataPath = 'data/todos.json';
let todos: Todo[] = [];

function generateId(todos: Todo[]) {
    const currentIds = todos.map(todo => todo.id);
    return Math.max(...currentIds, 0) + 1;
}

function setTodos(todos: Todo[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(todos);
        fs.writeFile(dataPath, data, () => {
            resolve();
        })
    })
}
export function getTodo(): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(dataPath, (err, data) => {
            const todos: Todo[] = JSON.parse(data.toString("utf8"));
            resolve(todos);
        })
    })
}

export function newTodo(description: string): Promise<Todo> {
    return new Promise((resolve, reject) => {
        getTodo().then((todos) => {
            const todo: Todo = {
                id: generateId(todos),
                description: description,
                status: TodoStatus.NotStarted
            }
            todos.push(todo);
        })
    })
}


export function updateTodo(id: number, data: any): Promise<Todo> {
    return new Promise((resolve, reject) => {
        getTodo().then((todos) => {
            const index = todos.findIndex(todo => todo.id === id);
            if (data.description) {
                todos[index].description = data.description;
            }
            if (data.status) {
                todos[index].status = data.status;
            }
            setTodos(todos).then(() => resolve(todos[index]))
        })
    })
}

export function deleteTodo(id: number): Promise<Todo> {
    return new Promise((resolve, reject) => {
        getTodo().then((todos) => {
            const index = todos.findIndex(todo => todo.id === id);
            todos.splice(index, 1);
            setTodos(todos).then(() => resolve(todos[index]))
        })
    })
}