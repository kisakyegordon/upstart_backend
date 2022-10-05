import dbQuery from "../db/dbQuery.js";

import { errorMessage, successMessage, status } from "../helpers/status.js";


const getPolls = async (req, res) => {
    const { user_id } = req.user;
    const getTodosQuery = "SELECT * FROM polls where user_id = $1";

    try {
        const { rows } = await dbQuery.query(getTodosQuery, [user_id]);
        successMessage.data = rows;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = "Get Todos Operation was not successful";
        return res.status(status.error).send(errorMessage);
    }
}

const getSinglePoll = async (req, res) => {
    const poll_id  = parseInt(req.params.id);
    const getTodosQuery = "SELECT * FROM polls where poll_id = $1";

    try {
        const { rows } = await dbQuery.query(getTodosQuery, [poll_id]);
        successMessage.data = rows;
        return res.status(status.success).send(successMessage);
    } catch (error) {
        errorMessage.error = "Get Todo Operation was not successful";
        return res.status(status.error).send(errorMessage);
    }
}

const createPoll = async (req, res) => {
    // ADMIN If user_id -> admin 

    // const { user_id } = req.user;
    const user_id = 1;
    const { title, option_a, option_b, option_c, option_d } = req.body;
    console.log("Life: ", req.body);
    const createTodosQuery = "INSERT INTO polls(title, user_id, option_a, option_b, option_c, option_d) VALUES($1, $2, $3, $4, $5, $6) returning *";

    try {
        const { rows } = await dbQuery.query(createTodosQuery, [title, user_id, option_a, option_b, option_c, option_d]);
        successMessage.data = rows;
        return res.status(status.created).send(successMessage);
    } catch (error) {
        errorMessage.error = "Create Polls Operation was not successful";
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
    getPolls,
    getSinglePoll,
    createPoll,
    // updatePoll,
    // deletePoll
}