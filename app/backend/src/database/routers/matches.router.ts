import { Router } from 'express';
import MatchController from '../controllers/Matches.controller';

const matchesRouter = Router();
const matchController = new MatchController();

matchesRouter.get('/', (req, res) => matchController.getAllMatches(req, res));

export default matchesRouter;
