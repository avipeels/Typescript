import * as express from 'express';
const app = express();
import { setupRoutes } from "./api/api";
setupRoutes(app);
app.listen(8091, () => console.log('Server started...'));