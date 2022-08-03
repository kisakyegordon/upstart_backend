import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

/**
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
 const isValidEmail = (email) => {
    const regEx = /\S+@\S+\.\S+/;
    return regEx.test(email);
  };


/**
 * validatePassword helper method
 * @param {string} password
 * @returns {Boolean} True or False
 */
const validatePassword = (password) => {
    if (password.length <= 5 || password === '') {
      return false;
    } return true;
  };


/**
 * isEmpty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const isEmpty = (input) => {
    if (input === undefined || input === '') {
      return true;
    }
    if (input.replace(/\s/g, '').length) {
      return false;
    } return true;
  };

/**
 * empty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
 */
const empty = (input) => {
    if (input === undefined || input === '') {
      return true;
    }
  };

/**
 * generate User Token
 * @param {string} id
 * @returns {string} token
 */
const generateUserToken = (email, user_id) => {
    const token = jwt.sign({
        email,
        user_id
    },
    process.env.SECRET,
    {expiresIn: '1d'}
    );

    return token;
  };

/**
 * Comapre user passswords
 * @param {string} database response password
 * @param {string} user request password
 * @returns {string} boolean, true if they match otherwise false;
 */

  const comparePassword = async (dbPassword, userPassword)  => {
    return await bcrypt.compare(dbPassword, userPassword);
  }

/**
 * Hash Password
 * @param {string} user request password
 * @returns {string} hashed version of user password
 */

     const hashPassword = async (userPassword)  => {
      return await bcrypt.hash(userPassword, 10);
    }



export {
    isValidEmail,
    comparePassword,
    hashPassword,
    generateUserToken,
    validatePassword,
    isEmpty,
    empty
};