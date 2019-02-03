import { Qualification } from '../models';
import { saveOnDiskAsJSON } from '../utils/utils';


const saveQualificationsOnDisk = async () => {
  const requirements = await Qualification.find();

   await saveOnDiskAsJSON(
     requirements,
      `../../RabotaUA/qualifications_${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.json`
    );
};

export default saveQualificationsOnDisk();

// saveQualificationsOnDisk();

// to run the script use
// export NODE_ENV=test && export USER=larry && export PASSWORD=amalarry4
// nodemon saveQualificationsOnDisk.js --exec babel-node --presets es2015,stage-2
