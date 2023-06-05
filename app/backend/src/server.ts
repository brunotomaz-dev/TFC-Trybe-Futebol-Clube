import 'dotenv/config';
import App from './app';

const PORT = `0.0.0.0:${Number(process.env.PORT) || 3001}`;
//const PORT = 3001;

new App().start(PORT);
