import { Router } from 'express';
import { verifyAdminById, validateToken, verifyUserById, verifyIsAdmin } from '../../middlewares/auth.middleware';
import {validateTeamData } from '../../middlewares/team.middleware';
import { 
    createTeam, 
    updateTeam, 
    deleteTeam, 
    getTeamById, 
    getTeams
} from '../../controllers/team.controller';

const router = Router();

router.post('/', validateToken, verifyAdminById, verifyIsAdmin, validateTeamData, createTeam);

router.patch('/:teamId', validateToken, verifyAdminById, verifyIsAdmin, validateTeamData, updateTeam);

router.delete('/:teamId', validateToken, verifyAdminById, verifyIsAdmin, deleteTeam);

router.get('/:teamId', validateToken, verifyUserById, getTeamById);

router.get('/', validateToken, verifyUserById, getTeams);

export default router;
