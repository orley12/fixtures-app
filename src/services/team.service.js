import { Team } from "../models/team";

export const createATeam = (team) => {
    return Team.create(team);
};

export const updateATeam = (_id, team) => {
    return Team.findOneAndUpdate({ _id }, team, { 
        new: true, 
        useFindAndModify: false 
    });
};

export const findTeamById = (_id) => {
    return Team.findById(_id).populate('fixtures');
};

export const findTeamByName = (teamName = {}) => {
    return Team.find(teamName).populate('fixtures');
};

export const deleteATeam = (_id) => {
    return Team.findOneAndDelete({ _id })
}