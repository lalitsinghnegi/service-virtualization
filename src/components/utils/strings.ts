export const replaceAllMap = (str: string, mapObj: any) => {
  if (Object.keys(mapObj).length === 0) return str;
  var re = new RegExp(Object.keys(mapObj).join("|"), "g");

  return str.replace(re, matched => mapObj[matched]);
};

/* Define function for escaping user input to be treated as 
   a literal string within a regular expression */
const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
