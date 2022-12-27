import { Router } from 'express';
import MatchController from '../controllers/Matches.controller';

const matchesRouter = Router();
const matchController = new MatchController();

matchesRouter.get('/', (req, res) => matchController.getAllMatches(req, res));
matchesRouter.post('/', (req, res) => matchController.createMatches(req, res));
matchesRouter.patch('/:id', (req, res) => matchController.updateMatch(req, res));
matchesRouter.patch('/:id/finish', (req, res) => matchController.updateMatchProgress(req, res));

export default matchesRouter;
