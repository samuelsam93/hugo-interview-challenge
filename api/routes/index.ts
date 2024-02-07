import { Router } from 'express';

import applicationRoutes from './appRoutes';

const routes = Router();

routes.use('/applications', applicationRoutes);

export default routes;
