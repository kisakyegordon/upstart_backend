import sequelize from "sequelize";

module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
        todo_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        isComplete: {
            type: Sequelize.BOOLEAN
        },
        user_id: {
            type: Sequelize.INTEGER,
            foreignKey: true
        },
    })

    return Todo;
}