export const toDropdownOptions = arr => {
  return arr.map(item => {
    return {
      key: item.key,
      value: item.value,
      text: item.text
    };
  });
};
