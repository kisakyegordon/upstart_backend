import pool from "./pool.js";

export default {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
    query(quertText, params) {
        console.log("dbQuery: ", quertText, params)
        return new Promise((resolve, reject) => {
            pool.query(quertText, params)
            .then(res => {
                console.log("dbQuery 1: ", res)
                resolve(res)
            })
            .catch(err => {
                console.log("dbQuery 2: ", err)
                reject(err);
            })
        })

    }
}