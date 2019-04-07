import parseRabotaUA from '../parsers/parseRabota_UA';
import {
  removeNotNeededInfoFromVacancyBottom,
  removeNotNeededInfoFromVacancyTop,
  getRequirementsFromVacancies,
} from '../parsers/parseRequirementsFromDescription';
import saveOnDisk from '../parsers/saveOnDisk';
import classify from '../controllers/classification';

const parseRabotaUATask = {
  timePattern: '0 3 * * *', //  "0 3 * * *"  At 3:00.   '*/5 * * * *', //  every 5 mins for debug

  async handler() {
    try {
      await parseRabotaUA();
      await removeNotNeededInfoFromVacancyTop();
      await removeNotNeededInfoFromVacancyBottom();
      await getRequirementsFromVacancies();
      await saveOnDisk('vacancies');
      await classify();
      await saveOnDisk('qualifications');
    } catch (err) {
      console.error('Error parsing from rabota ua', err);
    }
  },
};

module.exports = parseRabotaUATask;
