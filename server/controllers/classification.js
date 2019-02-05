import { Qualification, Vacancy } from '../models';

const classify = async () => {
  const qualifications = await Qualification.find({}, { _id: 1, value: 1 });
  const requirements = await Vacancy.find({}, { requirements: 1 });

  // loop through all qualifications
  for (let i = 0; i < qualifications.length; i++) {
    let counter = 0;
    // loop through all requirements in vacancies
    for (let g = 0; g < requirements.length; g++) {
      for (let l = 0; l < requirements[g].length; l++) {
        // check that skill is in stringWithOneRequirement
        const oneRequirement = requirements[g][l].split(' ');
        if (oneRequirement.indexOf(qualifications[i].value) !== -1) counter += 1;
      }
    }
    if (counter)
      await Qualification.updateOne({ _id: qualifications[i]._id }, { $set: { counter } });
  }

  console.log('Finished classification');
};

// TODO get qualifications sorted by counter, only with counter > 0
export const qualifications = async () => Qualification.find();

export default classify;
// classify();

// to run the script use
// export NODE_ENV=test && export USER=larry && export PASSWORD=amalarry4
// nodemon classification.js --exec babel-node --presets es2015,stage-2
