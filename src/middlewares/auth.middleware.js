import Joi from '@hapi/joi';
import { findAdmin, findUser, findAdminById, findUserById } from '../services/auth.service';
import statusCode from '../utils/statusCode';
import { verifyToken, formatJWTErrorMessage } from '../utils/jwt';
import { respondWithWarning, respondWithSuccess } from '../utils/responseHandler'
import { createAuthValidationObject } from "../utils/validator";
import responseMessage from "../utils/responseMessage";
import { joiValidator } from '../utils/joiValidator';

export const verifyAdmin = async(req, res, next) => {
    const { body: { email } } = req;
    
    const [ adminData ] = await findAdmin(email);
    if(!adminData){
        return respondWithWarning(res, statusCode.success, 'admin not found');
    }
    
    req.adminData = adminData;
    return next();
};

export const verifyUser = async (req, res, next) => {
    const { body: { email } } = req;
    
    const [ userData ] = await findUser(email);
    if(!userData){
        return respondWithWarning(res, statusCode.success, 'user not found');
    }

    req.userData = userData;
    return next(); 
};

export const verifyAdminById = async (req, res, next) => {
    const { auth: { id } } = req;

    const adminData = await findAdminById(id);
    if(!adminData){
        return respondWithWarning(res, statusCode.success, 'admin not found');
    }

    req.adminData = adminData;
    return next();
};

export const verifyIsAdmin = async (req, res, next) => {
    const { adminData } = req;

    if (!adminData.isAdmin) {
        return respondWithWarning(res, statusCode.unauthorizedAccess, "permission denied");
    }

    return next();
};

export const verifyUserById = async (req, res, next) => {
    const { auth: { id } } = req;

    const user = await findUserById(id);
    if(!user){
        return respondWithWarning(res, statusCode.success, 'admin not found');
    }

    req.user = user;
    return next();
};

export const validateToken = (req, res, next) => {
    const { headers: { token } } = req;

    if (!token) {
        return respondWithWarning(res, statusCode.unauthorizedAccess, 'no token is provided');
    } 
  
    try {
        req.auth = verifyToken(token);
        return next();

    } catch (error) {
        return respondWithWarning(res, 401, formatJWTErrorMessage(error.message));
    }
};

export const validateAuthData = (req, res, next) => {
  const { method, url } = req;

  const validationObject = createAuthValidationObject(method, url);

  const schema = Joi.object().keys(validationObject);

  const errors = joiValidator(req.body, schema);
  if (!errors) {
    return next();
  }
  
  return respondWithWarning(res, statusCode.badRequest, responseMessage.badInputRequest, errors);
};