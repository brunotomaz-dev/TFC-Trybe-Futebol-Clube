import 'dotenv/config';
import App from './app';

const PORT = process.env.PORT || 3001;
const RailwayPort = `0.0.0.0:${PORT}`;

new App().start(RailwayPort);
