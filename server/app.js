import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { serverPort } from './config/enviroment';

import getBestVacancies from "./controllers/chooseBestVacanciesForCandidate";

const app = express();

app.use( bodyParser.json() );
app.use(cors({ origin: '*' }));

app.post('/getBestVacancies', async (req, res) => {
  let response;
  try {
    console.log(req.body.data);
    response = await getBestVacancies(req.body.data);
    res.send(200, response);
  }
  catch(e) {
    console.error(e);
  }
});

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});