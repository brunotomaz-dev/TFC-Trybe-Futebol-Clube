import 'dotenv/config';
import App from './app';

const PORT = Number(process.env.PORT);
//const PORT = 3001;

new App().start(PORT);
