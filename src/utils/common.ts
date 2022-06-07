/**
 *
 * @param {*} api -> EndPoint -> url
 * @returns array
 */

const getData = async (api) => {
  const res = await fetch(`${api}`);
  const dataToJSON = await res.json();
  return dataToJSON;
};

export default getData;
