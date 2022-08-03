import pool from "./pool.js";

pool.on("connect", () => {
    console.log("Connected to dB");
})

/**
 * Create User Table
 * CREATE TABLE test
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL, 
  phone VARCHAR(100));
 */
  const createUsersTable = () => {
    const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
    (id SERIAL PRIMARY KEY, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(100) NOT NULL)`;
  
    pool.query(userCreateQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };

  /**
 * Create Todos Table
 */
const createTodoTable = () => {
    const todoCreateQuery = `CREATE TABLE IF NOT EXISTS todos
      (id SERIAL PRIMARY KEY, 
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(300) NOT NULL, 
      isComplete BOOLEAN NOT NULL)`;
  
    pool.query(todoCreateQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };

  /**
 * Drop User Table
 */
const dropUsersTable = () => {
    const usersDropQuery = 'DROP TABLE IF EXISTS users';
    pool.query(usersDropQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };

    /**
 * Drop Todos Table
 */
const dropTodosTable = () => {
    const todosDropQuery = 'DROP TABLE IF EXISTS todos';
    pool.query(todosDropQuery)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  };
  

  /**
 * Create All Tables
 */
const createAllTables = () => {
    createUsersTable();
    createTodosTable();
  };
  
  
  /**
   * Drop All Tables
   */
  const dropAllTables = () => {
    dropUsersTable();
    dropTodosTable();
  };



export {
    createAllTables,
    dropAllTables,
  };
require('make-runnable');