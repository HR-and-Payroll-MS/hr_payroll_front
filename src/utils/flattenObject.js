// utils/flattenObject.js

export function flattenObject(obj, parentKey = "", result = {}) {
  if (obj === null || typeof obj !== "object") return result;

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const newKey = parentKey ? `${parentKey}_${key}` : key;
    const value = obj[key];

    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === "object" && v !== null) {
          flattenObject(v, `${newKey}_${i}`, result);
        } else {
          result[`${newKey}_${i}`] = v;
        }
      });
    } else if (typeof value === "object" && value !== null) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}
