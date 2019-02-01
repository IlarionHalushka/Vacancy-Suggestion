import { predicateBy } from '../utils/utils';
import qualifications from '../../RabotaUA/qualifications+technologies+skills';
import requirementsJson from '../../RabotaUA/requirementsTranslated';

const classify = function classify() {
  const skillsFrequency = [];

  // loop through all qualifications
  for (let i = 0; i < qualifications.length; i++) {
    for (let j = 0; j < qualifications[i].qualificationsList.length; j++) {
      for (let k = 0; k < qualifications[i].qualificationsList[j].value.length; k++) {
        const skill = qualifications[i].qualificationsList[j].value[k].toLowerCase();
        let counter = 0;

        // loop through all requirements in vacancies
        for (let g = 0; g < requirementsJson.length; g++) {
          for (let l = 0; l < requirementsJson[g].requirements.length; l++) {
            // remove all unnecessary symbols
            const stringWithOneRequirement = requirementsJson[g].requirements[l].replace(/[~@#$%^&*|<>,.:;!'`"(){}?=+/\\]/g, ' ');

            // check that skill is in stringWithOneRequirement
            const indexOfSkillInRequirement = stringWithOneRequirement.toLowerCase().indexOf(skill);

            // if skill is in requirement counter++
            if (indexOfSkillInRequirement !== -1) {
              counter += 1;
            }
          }
        }

        skillsFrequency.push({ skill, counter });
      }
    }
  }

  return skillsFrequency.sort(predicateBy('counter'));
};

console.log(classify());

// to run the script use 'node classification.js'
