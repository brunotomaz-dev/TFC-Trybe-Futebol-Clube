import 'dotenv/config';
import App from './app';

// const PORT = 3001;
const PORT = process.env.PORT;
const RailwayPort = `0.0.0.0:${PORT}`;

new App().start(RailwayPort);
