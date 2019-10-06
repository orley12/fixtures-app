import { Router } from 'express';
import {  
    createFixture, 
    updateFixture, 
    deleteFixture, 
    getFixtureById, 
    getFixtures
} from '../../controllers/fixtures.controller';
import { 
    verifyAdminById, 
    validateToken, 
    verifyUserById,
    verifyIsAdmin,
} from '../../middlewares/auth.middleware';
import { validateFixtureData, convertTimeToMilliseconds } from '../../middlewares/fixture.middleware';

const router = Router();

router.post('/', [validateToken, verifyAdminById, verifyIsAdmin, convertTimeToMilliseconds, validateFixtureData], createFixture);

router.patch('/:fixtureId', validateToken, verifyAdminById, verifyIsAdmin, convertTimeToMilliseconds, validateFixtureData, updateFixture, );

router.delete('/:fixtureId', validateToken, verifyAdminById, verifyIsAdmin, deleteFixture);

router.get('/:fixtureId', validateToken, verifyUserById, getFixtureById);

router.get('/', validateToken, verifyUserById, convertTimeToMilliseconds, getFixtures);

export default router;
