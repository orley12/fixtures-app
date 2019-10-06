import Joi from '@hapi/joi';
import { createTeamValidationObject } from "../utils/validator";
import { joiValidator } from "../utils/joiValidator";
import { respondWithWarning } from "../utils/responseHandler";
import statusCode from '../utils/statusCode';
import responseMessage from '../utils/responseMessage';

export const validateTeamData = (req, res, next) => {
    const { method, url } = req;
  
    const validationObject = createTeamValidationObject(method, url);
  
    const schema = Joi.object().keys(validationObject);
  
    const errors = joiValidator(req.body, schema);
    if (!errors) {
      return next();
    }
    
    return respondWithWarning(res, statusCode.badRequest, responseMessage.badInputRequest, errors);
  };