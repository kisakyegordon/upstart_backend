import dbQuery from "../db/dbQuery.js";

import { errorMessage, successMessage, status } from "../helpers/status.js";


const getTodos = async (req, res) => {
    const { user_id } = req.user;
    const getTodosQuery = "SELECT * FROM todos where user_id = $1";

    try {
        const { rows } = await dbQuery.query(getTodosQuery, [user_id]);
        successMessage.data = rows;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = "Get Todos Operation was not successful";
        return res.status(status.error).send(errorMessage);
    }
}

const getSingleTodo = async (req, res) => {
    const todo_id  = parseInt(req.params.id);
    const getTodosQuery = "SELECT * FROM todos where todo_id = $1";

    try {
        const { rows } = await dbQuery.query(getTodosQuery, [todo_id]);
        successMessage.data = rows;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = "Get Todo Operation was not successful";
        return res.status(status.error).send(errorMessage);
    }
}

const createTodo = async (req, res) => {
    const { user_id } = req.user;
    const { title, is_complete } = req.body;
    console.log("Life: ", req.body);
    const createTodosQuery = "INSERT INTO todos(title, is_complete, user_id) VALUES($1, $2, $3) returning *";

    try {
        const { rows } = await dbQuery.query(createTodosQuery, [title, is_complete, user_id]);
        successMessage.data = rows;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        errorMessage.error = "Create Todos Operation was not successful";
        return res.status(status.error).send(errorMessage);
    }
}


const updateTodo = async (req, res) => {
    console.log("Boom: ", req);
    const todo_id  = parseInt(req.params.id);
    const { title, is_complete } = req.body;
    const updateTodosQuery = "UPDATE todos SET title = $1, is_complete = $2 WHERE todo_id = $3 returning *";

    try {
        const { rows } = await dbQuery.query(updateTodosQuery, [title, is_complete, todo_id]);
        successMessage.data = rows;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = "Update Todo Operation was not successful";
        return res.status(status.error).send(errorMessage);
    }
}

const deleteTodo = async (req, res) => {
    const todo_id  = parseInt(req.params.id);
    const deleteTodosQuery = "DELETE FROM todos WHERE todo_id = $1";

    try {
        const { rows } = await dbQuery.query(deleteTodosQuery, [todo_id]);
        successMessage.data = rows;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = "Update Todo Operation was not successful";
        return res.status(status.error).send(errorMessage);
    }
}


export {
    getTodos,
    getSingleTodo,
    createTodo,
    updateTodo,
    deleteTodo
}