import dbQuery from '../db/dbQuery.js';

import {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
} from '../helpers/validation.js';

import {
  errorMessage, successMessage, status,
} from '../helpers/status.js';


/**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
*/

const createUser = async (req, res) => {
  console.log("Life", req)
    const {email, password} = req.body;

    if(isEmpty(email) || isEmpty(password)) {
        errorMessage.error = "email, password fields cannot be empty";
        return res.status(status.bad).send(errorMessage)
    }

    if(!isValidEmail(email)) {
        errorMessage.error = "please enter valid email";
        return res.status(status.bad).send(errorMessage)
    }

    if(!validatePassword(password)) {
        errorMessage.error = "Password must be more that 5 characters";
        return res.status(status.bad).send(errorMessage)
    }

    const hashedPassword = await hashPassword(password);

    const createUserQuery = "INSERT INTO users(email, password) VALUES($1, $2) returning *";

    const values = [
        email,
        hashedPassword
    ];
  console.log("Life 2: ", values)


    try {
        console.log("Try 1: ")
        const { rows } = await dbQuery.query(createUserQuery, values);
        // const rows = [];
        const dbResponse = rows[0];
        delete dbResponse.password;
        console.log("Try 1.5 User: ", dbResponse)
        const token = generateUserToken(dbResponse.email, dbResponse.user_id);
        console.log("Try 2 Token: ", token)
        successMessage.data = dbResponse;
        successMessage.data.token = token;
        return res.status(status.created).send(successMessage);
      } catch (error) {
        console.log("Try 3 Error: ", error)
        if (error.routine === '_bt_check_unique') {
          errorMessage.error = 'User with that EMAIL already exist';
          return res.status(status.conflict).send(errorMessage);
        }
        errorMessage.error = 'Operation was not successful';
        return res.status(status.error).send(errorMessage);
      }
}


/**
   * Signin
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  const signinUser = async(req, res) => {
    const {email, password} = req.body;

  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }

  const signinUserQuery = "SELECT * FROM users where email = $1";

  try {
    const {rows} = await dbQuery.query(signinUserQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist';
      return res.status(status.notfound).send(errorMessage);
    }

    if (!comparePassword(dbResponse.password, password)) {
        errorMessage.error = 'The password you provided is incorrect';
        return res.status(status.bad).send(errorMessage);
    }

    const token = generateUserToken(dbResponse.email, dbResponse.user_id);
    delete dbResponse.password;
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }


  }

export {
    createUser,
    signinUser
}