import { respondWithWarning } from "../utils/responseHandler";

export const apiCallsManager =  (req, res, next) =>{
    if(req.session){
      if(req.session.apiCalls > 99 ){
        return respondWithWarning(res, 429,
           'Too many requests. Please restart your browser or logout to continue');
      }
      req.session.apiCalls += 1;
      return next();
    } 
    return respondWithWarning(res, 400, 'Humm session not created yet');
  }