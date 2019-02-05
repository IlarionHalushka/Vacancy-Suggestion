import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { default as config } from './config/enviroment';

import getBestVacancies from './controllers/chooseBestVacanciesForCandidate';
import { qualifications } from './controllers/classification';

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

app.post('/getBestVacancies', async (req, res) => {
  try {
    console.log(req.body.data);
    const response = await getBestVacancies(req.body.data);
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(e.message);
    console.error(e);
  }
});

app.get('/qualifications', async (req, res) => {
  try {
    const response = await qualifications();
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(e.message);
    console.error(e);
  }
});

const server = app.listen(config.serverPort, () => {
  let host = 'localhost';
  let port = config.serverPort;

  if (process.env.NODE_ENV === 'production') {
    host = server.address().address;
    port = server.address().port;
  }

  console.log(`Server app listening at http://${host}:${port}`);
});
