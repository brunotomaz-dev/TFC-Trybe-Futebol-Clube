import 'dotenv/config';
import App from './app';

const PORT = `0.0.0.0:${Number(process.env.PORT)}`;
//const PORT = 3001;

new App().start(PORT);
