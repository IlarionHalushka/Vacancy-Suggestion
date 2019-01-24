import parseRabotaUA from '../parsers/parseRabota_UA';
import {
  removeNotNeededInfoFromVacancyBottom,
  removeNotNeededInfoFromVacancyTop,
  getRequirementsFromVacancies,
} from '../parsers/parseRequirementsFromDescription';

const parseRabotaUATask = {
  timePattern: '*/5 * * * *', //  "0 3 * * *"  At 3:00.   '*/5 * * * *', //  every 5 mins for debug

  async handler() {
    try {
      await parseRabotaUA();
      await removeNotNeededInfoFromVacancyTop();
      await removeNotNeededInfoFromVacancyBottom();
      await getRequirementsFromVacancies();
    } catch (err) {
      console.error('Error parsing from rabota ua', err);
    }
  },
};

module.exports = parseRabotaUATask;
