import { useMemo } from "react";

export function useFormattedTableData(rawData, bodyStructure, keys) {
  const output = (raw, body, key = []) => {
    let resultArray = [];
    switch (body) {
      case 3:
        resultArray.push(raw[key[0]]);
        resultArray.push(raw[key[1]]);
        resultArray.push(raw[key[2]]);
        break;
      case 2:
        resultArray.push(raw[key[0]]);
        resultArray.push(raw[key[1]]);
        break;
      case 1:
        resultArray.push(raw[key[0]]);
        break;
      default:
        break;
    }
    return resultArray; 
  };

  const collectedData = useMemo(() => {
    let result = [];  
    rawData.forEach((i) => {
      let rowResult = []; 

      bodyStructure.forEach((j, iny) => {
        const resultForThisBody = output(i, j, keys[iny]);
        rowResult.push(resultForThisBody);
      });

      result.push(rowResult);
    });

    return result;
  }, [rawData, bodyStructure, keys]);
  console.log(collectedData)

  return collectedData;
}
