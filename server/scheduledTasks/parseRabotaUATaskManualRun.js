import parseRabotaUA from "../parsers/parseRabota_UA";
import {
  removeNotNeededInfoFromVacancyBottom,
  removeNotNeededInfoFromVacancyTop,
  getRequirementsFromVacancies
} from "../parsers/parseRequirementsFromDescription";

(async () => {
    try {
      await parseRabotaUA();
      await removeNotNeededInfoFromVacancyTop();
      await removeNotNeededInfoFromVacancyBottom();
      await getRequirementsFromVacancies();
    } catch (err) {
      console.error("Error parsing from rabota ua", err);
    }
  })();


