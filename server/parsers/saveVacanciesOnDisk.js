import { Vacancy } from '../models';
import { saveOnDiskAsJSON } from '../utils/utils';


const saveVacanciesOnDisk = async () => {
  const requirements = await Vacancy.find();

   await saveOnDiskAsJSON(
     requirements,
      `../../RabotaUA/vacancies_${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.json`
    );
};

export default saveVacanciesOnDisk();

// saveVacanciesOnDisk();

// to run the script use
// export NODE_ENV=test && export USER=larry && export PASSWORD=amalarry4
// nodemon saveVacanciesOnDisk.js --exec babel-node --presets es2015,stage-2
