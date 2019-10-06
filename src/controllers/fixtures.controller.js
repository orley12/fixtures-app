import _ from 'lodash';
import { 
  createAFixture, 
  findAFixture, 
  updateAFixture, 
  deleteAFixture, 
  findAllFixtures, 
  findFixtureById
} from "../services/fixtures.service";
import { respondWithSuccess, respondWithWarning } from "../utils/responseHandler";
import statusCode from "../utils/statusCode";
import responseMessage from "../utils/responseMessage";

export const createFixture = async (req, res) => {  
  const { 
    body,
    adminData: { id } 
  } = req;
  try {
      const { _doc: fixture} = await createAFixture({ ...body, creatorId: id });

      return respondWithSuccess(res, statusCode.created, "team created", _.omit(fixture, ['__v']));
  } catch (error) {   
    return respondWithWarning(res, statusCode.internalServerError, responseMessage.internalServerError);
  }
  };

  export const updateFixture = async (req, res) => {          
    const { 
        body,
        params: { fixtureId } 
    } = req;

    try {
      const { _doc: updatedFixture} = await updateAFixture(fixtureId, body);
      
      return respondWithSuccess(res, statusCode.success, "team updated", _.omit(updatedFixture, ['__v']));
    } catch (error) {      
    return respondWithWarning(res, statusCode.internalServerError, 'Unable to updated team');
    }
  };

  export const deleteFixture = async (req, res) => {  
    const { params: { fixtureId } } = req;

    try {
      const deletedFixture = await deleteAFixture(fixtureId);
      if(!deletedFixture){
        return respondWithSuccess(res, statusCode.success, "fixture not found");
      }
      return respondWithSuccess(res, statusCode.success, "fixture deleted", _.omit(deletedFixture, ['__v']));
    } catch (error) {
      console.log(error);

    return respondWithWarning(res, statusCode.internalServerError, 'Unable to delete fixture');
    }  };

  export const getFixtureById = async (req, res) => {  
    const { params: { fixtureId } } = req;

    try {
      const { _doc: fixture} = await findFixtureById(fixtureId);

      if(!fixture){
        return respondWithWarning(res, statusCode.success, responseMessage.notfound);
      }
      return respondWithSuccess(res, statusCode.success, responseMessage.success, _.omit(fixture, ['__v']));
    } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Unable to get fixture');
    }
  };

  
  export const getFixtures = async (req, res) => {  
    const { query: { date } } = req;   
    console.log(date); 
    let fixture;
    try {
      if(date){
        fixture = await findAllFixtures({ date })
       } else {
        fixture = await findAllFixtures(); 
       }

       if(!fixture){
        return respondWithWarning(res, statusCode.success, responseMessage.notfound);
      }
      return respondWithSuccess(res, statusCode.success, responseMessage.success, fixture);
    } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Unable to get fixtures');
    }
  };