import { isNullOrUndefined, isArray } from "util";
import _ from "lodash";

export const objectContainsProperties = (
  object: any,
  properties: any,
  exclude: Array<string> = []
) => {
  // optional - array of field/property names that can be undefined/null
  console.log(object);
  console.log(properties);
  for (var p in object) {
    if (object.hasOwnProperty(p) && !exclude.includes(p)) {
      if (object[p] !== properties[p]) {
        return false;
      }
    }
  }
  return true;
};

export const filterObjects = (arrayToFilter: Array<any>, filters: any = {}) => {
  let filteredArray = [...arrayToFilter];
  for (var filter in filters) {
    const key = filter;
    const allowedValues = filters[filter];
    if (Array.isArray(allowedValues)) {
      filteredArray = filteredArray.filter(item =>
        allowedValues.includes(item[key])
      );
    } else {
      filteredArray = filteredArray.filter(item => item[key] === allowedValues);
    }
  }
  return filteredArray;
};

export const containsItems = (items: Array<any>) => items && items.length > 0;

export const getDistinctObjects = (
  array: Array<any>,
  valueKeys: Array<string>,
  filters: any
) => {
  // valueKeys = [] - distinct values
  // returns [filteredArray, distinctObjects]
  // filters = {key: [...allowedValues]}
  if (!(isArray(array) && isArray(valueKeys))) return [[], []];
  if (array.length === 0 || valueKeys.length === 0) return [[], []];
  const primaryKey = valueKeys[0];
  let filteredArray = filterObjects(array, filters);
  let distinctObjects = _.sortBy(
    _.uniqBy(
      filteredArray
        .filter(item => item[primaryKey] !== undefined)
        .map(item => ({
          ...item,
          keyId: valueKeys.map(key => item[key]).join()
        })),
      "keyId"
    ),
    primaryKey
  );
  return [filteredArray, distinctObjects];
};

export const getDistinctValues = (
  array: Array<any>,
  valueKeys: Array<string>,
  filters: any
) => {
  const [filteredArray, distinctObjects] = getDistinctObjects(
    array,
    valueKeys,
    filters
  );
  const distinctValues = distinctObjects.map(item => item[valueKeys[0]]).sort();
  return [filteredArray, distinctValues];
};
