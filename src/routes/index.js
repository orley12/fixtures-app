import { Router } from 'express';
import auth from './api/auth.routes';
import team from './api/team.routes';
import fixture from './api/fixtures.routes';

const apiRouter = Router();

apiRouter.use('/api/v1/auth', auth);
apiRouter.use('/api/v1/teams', team);
apiRouter.use('/api/v1/fixtures', fixture);

export default apiRouter;