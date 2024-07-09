import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, './config/.env') });

import server from './app/server';

const PORT = process.env.ORDERS_PORT || 7003;

server.listen(PORT, () => console.log(`Server is live at localhost:${PORT}`));