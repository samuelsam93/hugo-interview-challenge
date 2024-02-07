import { Router } from 'express';

import * as Controllers from '../controllers/appControllers';

import bodyParser from 'body-parser';

const routes = Router();

var jsonParser = bodyParser.json()

routes.post('/', jsonParser, async (req, res) => {
    const app = await Controllers.createApplication(req.body);
    
    res.json({
        message: `Resume your application at http://localhost:5173/application?id=${app.id}`,
        resume: `http://localhost:5173/application?id=${app.id}`,
        app: app
    });
});

routes.get('/:id', jsonParser, async (req, res) => {
    const app = await Controllers.getApplication(req.params.id)

    res.json({
        message: `Get insurance application with id ${req.params.id}`,
        ...app
    });
});

routes.put('/:id', jsonParser, async (req, res) => {
    const app = await Controllers.updateApplication(req.body)
    res.json({
        message: `Updated insurance application with id ${req.params.id}`,
    });
});

routes.post('/:id/submit', jsonParser, async (req, res) => {
    const app = await Controllers.submitApplication(req.body)
    res.json({
        message: `Submit insurance application with id ${req.params.id}`,
        price: app.price
    });
});

export default routes;
