import Joi from '@hapi/joi';
import { createFixtureValidationObject } from "../utils/validator";
import { joiValidator } from "../utils/joiValidator";
import { respondWithWarning } from "../utils/responseHandler";
import statusCode from '../utils/statusCode';
import responseMessage from '../utils/responseMessage';

export const validateFixtureData = (req, res, next) => {
    const { method, url } = req;
  
    const validationObject = createFixtureValidationObject(method, url);
  
    const schema = Joi.object().keys(validationObject);
  
    const errors = joiValidator(req.body, schema);
    if (!errors) {
      return next();
    }
    
    return respondWithWarning(res, statusCode.badRequest, responseMessage.badInputRequest, errors);
  };

  export const convertTimeToMilliseconds = (req, res, next) => {
    const { 
      body: { date }, 
      query: { date: dateValue } 
    } = req;

    if(dateValue){
      req.query.date = Date.parse(dateValue);
      return next();
    }

    if(date){
      req.body.date = Date.parse(date);
      return next();
    }
    
    return next();
  };