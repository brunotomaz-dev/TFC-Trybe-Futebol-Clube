import { Router } from 'express';
import TeamsController from '../controllers/Teams.controller';

const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.get('/', (req, res) => teamsController.getAllTeams(req, res));

export default teamsRouter;
