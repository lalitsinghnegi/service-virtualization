import _ from "lodash";

export const prepareDatasets = datasets => {
  // adjust datasets to have same keys to present on chart. if keys don't exist
  let allLabels = [];

  datasets.forEach(({ data }) => {
    allLabels.push(...data.map(d => d.key)); // aggregate keys
  });

  // remove duplicates from all labels.
  allLabels = [...new Set(allLabels)];

  console.log(allLabels);

  // assign zero values to datasets that key does not exist on.
  return datasets.map(dataset => {
    const { data } = dataset;
    allLabels.forEach(key => {
      if (!data.map(d => d.key).includes(key)) {
        data.push({ y: 0, key });
      }
    });
    return {
      ...dataset,
      data: _.sortBy(data, "key")
    };
  });
};
