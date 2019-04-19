import path from 'path';
import { Vacancy } from '../models';
import { saveOnDiskAsJSON } from '../utils/utils';

const saveOnDisk = async name => {
  const requirements = await Vacancy.find();

  await saveOnDiskAsJSON(
    requirements,
    // or change to ../../..
    path.join(__dirname, '../..', `RabotaUA/${name}_${new Date().toISOString()}.json`)
  );
};

export default saveOnDisk;
// export default saveOnDisk('qualifications');

// saveOnDisk('vacancies');

// to run the script use
// export NODE_ENV=test && export USER=larry && export PASSWORD=amalarry4
// nodemon saveVacanciesOnDisk.js --exec babel-node --presets es2015,stage-2
