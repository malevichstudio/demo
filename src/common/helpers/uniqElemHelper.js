export const getUniqElem = (elem) => {
  const proxy = JSON.stringify(elem);

  return JSON.parse(proxy);
}