const qualifications = require('../../RabotaUA/qualifications+technologies+skills');
const requirementsJson = require('../../RabotaUA/requirementsTranslated');

const classify = function classify() {
  let result = [];

  // loop through all qualifications
  for (let i = 0; i < qualifications.length; i++) {
    for (let j = 0; j < qualifications[i].qualificationsList.length; j++) {
      const skills = qualifications[i].qualificationsList[j].value;
      for (let k = 0; k < qualifications[i].qualificationsList[j].value.length; k++) {
        const skill = qualifications[i].qualificationsList[j].value[k];
        let counter = 0;

        // loop through all requirements in vacancies
        for (let g = 0; g < requirementsJson.length; g++) {
          for (let l = 0; l < requirementsJson[g].requirements.length; l++) {
            let stringWithOneRequirement = requirementsJson[g].requirements[l];
            stringWithOneRequirement = stringWithOneRequirement.replace(/,/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/\./g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/:/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/;/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/!/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/'/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/"/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/\(/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/\)/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/]/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/\[/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/{/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/}/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/\?/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/`/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/=/g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/\//g, " ");
            stringWithOneRequirement = stringWithOneRequirement.replace(/\\/g, " ");

            let oneVacancyRequirementsArray = stringWithOneRequirement.split(" ");

            if (oneVacancyRequirementsArray.findIndex(item =>
                skill.toLowerCase() === item.toLowerCase()) !== -1) {
              counter += 1;
              //l = requirementsJson[g].requirements.length;
              //qualifications[i].qualificationsList[j].counter = qualifications[i].qualificationsList[j].counter + 1;
            }
          }
        }
        result.push({skill: skill, counter: counter});
        //console.log("{\"skill\":\"" + skill + "\", \"counter\":", counter, "},");
      }
      //result.push({skills: skills, counter: qualifications[i].qualificationsList[j].counter});
      //console.log("{\"skills\":", skills, ", \"counter\":", qualifications[i].qualificationsList[j].counter, "},");
    }
  }

  result = result.sort(predicateBy("counter"));
 // console.log(result);

};

function predicateBy(prop){
  return function(a,b){
    if( a[prop] < b[prop]){
      return 1;
    }else if( a[prop] > b[prop] ){
      return -1;
    }
    return 0;
  }
}

classify();

// to run the script use 'node classification.js'

