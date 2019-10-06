import _ from 'lodash';
import { createATeam, findTeamById, updateATeam, deleteATeam, findTeamByName } from "../services/team.service";
import { respondWithSuccess, respondWithWarning } from "../utils/responseHandler";
import statusCode from "../utils/statusCode";
import responseMessage from "../utils/responseMessage";

export const createTeam = async (req, res) => {  
    const { 
        body,
        adminData: { id } 
    } = req;
    try {
        const {_doc: team} = await createATeam({ ...body, creatorId: id });

        return respondWithSuccess(res, statusCode.created, "team created", _.omit(team, ['__v']));
    } catch ({ errmsg }) {      
      if(errmsg && errmsg.includes('duplicate')){
        return respondWithWarning(res, statusCode.conflict, responseMessage.conflict);
      } 
      return respondWithWarning(res, statusCode.internalServerError, responseMessage.internalServerError);
    }
  };

  export const updateTeam = async (req, res) => {  
    const { params: { teamId } } = req;
        
    const { 
        body, 
    } = req;

    try {
      const { _doc: updatedTeam} = await updateATeam(teamId, body);
      
      return respondWithSuccess(res, statusCode.success, "team updated", _.omit(updatedTeam, ['__v']));
    } catch ({ errmsg }) {
      if(errmsg && errmsg.includes('duplicate')){
        return respondWithWarning(res, statusCode.conflict, responseMessage.conflict);
      } 
    return respondWithWarning(res, statusCode.internalServerError, 'Unable to update team');
    }
  };

  export const deleteTeam = async (req, res) => {  
    const { params: { teamId } } = req;

    try {
      const deletedTeam = await deleteATeam(teamId);
      if(!deletedTeam){
        return respondWithWarning(res, statusCode.success, "team not found");
      }
      return respondWithSuccess(res, statusCode.success, "team deleted", _.omit(deletedTeam, ['__v']));
    } catch (error) {
      console.log(error);
    return respondWithWarning(res, statusCode.internalServerError, 'Unable to delete team');
    }
  };

  export const getTeamById = async (req, res) => {  
    const { params: { teamId } } = req;

    try {
      const team = await findTeamById(teamId);
      if(!team){
        return respondWithWarning(res, statusCode.success, responseMessage.notfound);
      }
      return respondWithSuccess(res, statusCode.success, responseMessage.success, _.omit(team, ['__v']));
    } catch (error) {
    return respondWithWarning(res, statusCode.internalServerError, 'Unable to get team');
    }
  };

  export const getTeams = async (req, res) => {  
    const { query: { teamName } } = req;    
    let team;
    try {
      if(teamName){
        team = await findTeamByName({ teamName })
       } else {
        team = await findTeamByName(); 
       }

       if(!team){
        return respondWithWarning(res, statusCode.success, responseMessage.notfound);
      }
      return respondWithSuccess(res, statusCode.success, responseMessage.success, team);
    } catch (error) {
      console.log(error);
    return respondWithWarning(res, statusCode.internalServerError, 'Unable to get team');
    }
  };