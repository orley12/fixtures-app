import _ from 'lodash';
import { hashPassword, comparePasswords } from '../utils/hash';
import { createAdmin, createUser } from '../services/auth.service';
import { generateToken } from '../utils/jwt';
import statusCode from '../utils/statusCode';
import { respondWithSuccess, respondWithWarning } from '../utils/responseHandler'
import responseMessage from '../utils/responseMessage';
/**
 * Login a user
 * @param {object} req
 * @param {object} res
 * @returns {object} json response
 */
export const adminSignup = async (req, res) => {
  const { body } = req;

  const hashedPassword =  await hashPassword(body.password);
  try {
    let admin = await createAdmin({
      ...body, 
      password: hashedPassword, 
      isAdmin: true 
    });
  
    const { _id: id, isAdmin, _doc: data } = admin;

    const token = await generateToken({ id, isAdmin });
    admin = { ...data, token }

    return respondWithSuccess(
      res, statusCode.success, responseMessage.success, _.omit(admin, ['password', '__v']));
  } catch ({ errmsg }) {    
    if(errmsg && errmsg.includes('duplicate')){
      return respondWithWarning(res, statusCode.conflict, responseMessage.conflict);
    } 
    return respondWithWarning(res, statusCode.internalServerError, responseMessage.internalServerError);
  }
};

/**
 * Login a user
 * @param {object} req
 * @param {object} res
 * @returns {object} json response
 */
export const adminSignin = async (req, res) => {
  let { 
    adminData: {_doc: admin},
    body: { password }
  } = req;
  
  const { _id: id, isAdmin, password: hashedPassword } = admin;

  const comparedPassword = await comparePasswords(password, hashedPassword);
  if (!comparedPassword) {
    return respondWithWarning(res, statusCode.unauthorizedAccess, "invalid password");
  }

  const token = await generateToken({ id, isAdmin });
  admin =  {...admin, token };

  return respondWithSuccess(res,
     statusCode.success, 
     'login successful', 
     _.omit(admin, ['password', '__v']));
};

/**
 * Login a user
 * @param {object} req
 * @param {object} res
 * @returns {object} json response
 */
export const userSignup = async (req, res) => {
  const { body } = req;
  delete body.isAdmin;

  const hashedPassword =  await hashPassword(body.password);
  try {
    let admin = await createUser({
      ...body, 
      password: hashedPassword 
    });
  
    const { _id: id, isAdmin, _doc: data } = admin;

    const token = await generateToken({ id, isAdmin });
    admin = { ...data, token }

    return respondWithSuccess(
      res, statusCode.created, responseMessage.success, _.omit(admin, ['password', '__v']));
  } catch ({ errmsg }) {    
    if(errmsg && errmsg.includes('duplicate')){
      return respondWithWarning(res, statusCode.conflict, responseMessage.conflict);
    } 
    return respondWithWarning(res, statusCode.internalServerError, responseMessage.internalServerError);
  }
};

export const userSignin = async (req, res) => {
  let { userData: {_doc: user} } = req;
  const { _id: id, isAdmin, password: hashedPassword } = user;

  const { body: { password } } = req;

  const comparedPassword = await comparePasswords(password, hashedPassword);
  if (!comparedPassword) {
    return respondWithWarning(res, statusCode.unauthorizedAccess, "invalid password");
  }

  const token = await generateToken({ id, isAdmin });
  user =  {...user, token };

  return respondWithSuccess(res,
     statusCode.success, 
     'login successful', 
     _.omit(user, ['password', '__v']));
};