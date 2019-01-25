import fs from 'fs';

export const saveOnDiskAsJSON = async (content, fileName) => {
  fs.writeFile(fileName, JSON.stringify(content), err => {
    if (err) {
      return console.log(err);
    }
    console.log(`The file ${fileName} was saved!`);
  });
};

export const escapeHTMLTags = string => {
  string = string.replace(/<p>/g, '');
  string = string.replace(/<\/p>/g, '');
  string = string.replace(/<\/ p>/g, '');
  string = string.replace(/<\/li>/g, '');
  string = string.replace(/<\/ li>/g, '');
  string = string.replace(/<li>/g, '');
  string = string.replace(/<b>/g, '');
  string = string.replace(/<\/b>/g, '');
  string = string.replace(/<\/ b>/g, '');
  string = string.replace(/<\/ul>/g, '');
  string = string.replace(/<\/ ul>/g, '');
  string = string.replace(/<ul>/g, '');
  string = string.replace(/&nbsp;/g, '');
  string = string.replace(/&nbsp/g, '');
  string = string.replace(/& nbsp/g, '');
  string = string.replace(/<u>/g, '');
  string = string.replace(/<\/u>/g, '');
  string = string.replace(/<\/ u>/g, '');
  string = string.replace(/\./g, ' ');
  string = string.replace(/:/g, ' ');
  string = string.replace(/;/g, ' ');
  string = string.replace(/!/g, ' ');
  string = string.replace(/'/g, ' ');
  string = string.replace(/"/g, ' ');
  string = string.replace(/\(/g, ' ');
  string = string.replace(/\)/g, ' ');
  string = string.replace(/]/g, ' ');
  string = string.replace(/\[/g, ' ');
  string = string.replace(/{/g, ' ');
  string = string.replace(/}/g, ' ');
  string = string.replace(/\?/g, ' ');
  string = string.replace(/`/g, ' ');
  string = string.replace(/=/g, ' ');
  string = string.replace(/\//g, ' ');
  string = string.replace(/\\/g, ' ');
  string = string.replace(/,/g, ' ');
  string = string.replace(/\./g, ' ');
  string = string.replace(/:/g, ' ');
  string = string.replace(/;/g, ' ');
  string = string.replace(/!/g, ' ');
  string = string.replace(/'/g, ' ');
  string = string.replace(/"/g, ' ');
  string = string.replace(/\(/g, ' ');
  string = string.replace(/\)/g, ' ');
  string = string.replace(/·/g, ' ');
  return string;
};

export const predicateBy = prop => (a, b) => {
  if (a[prop] < b[prop]) {
    return 1;
  }
  if (a[prop] > b[prop]) {
    return -1;
  }
  return 0;
};

export default saveOnDiskAsJSON;
