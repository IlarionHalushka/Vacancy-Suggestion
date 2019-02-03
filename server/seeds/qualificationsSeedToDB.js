import qualifications from './qualifications+technologies+skills';
import { Qualification } from '../models';

const seed = () =>  {
  for (let i = 0; i < qualifications.length; i++) {
    for (let j = 0; j < qualifications[i].qualificationsList.length; j++) {
      for (let k = 0; k < qualifications[i].qualificationsList[j].value.length; k++) {
        Qualification.create({
          section: qualifications[i].type,
          value: qualifications[i].qualificationsList[j].value[k].toLowerCase(),
        });
      }
    }
  }
};

seed();

// to run the script use:
// export NODE_ENV=test && export USER=larry && export PASSWORD=amalarry4
// nodemon qualificationsSeedToDB.js --exec babel-node --presets es2015,stage-2

