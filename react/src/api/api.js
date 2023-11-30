const smartphonesUrl = 'http://localhost:3030/jsonstore/smartphones';
const cellphonesUrl = 'http://localhost:3030/jsonstore/cellphones';
const smartwatchesUrl = 'http://localhost:3030/jsonstore/smartwatches';

export const getAllSmartphones = async() => {
    const response = await fetch(smartphonesUrl);
    const result = await response.json();

    const data = Object.values(result);
    
    return data
}

export const getAllCellphones = async() => {
    const response = await fetch(cellphonesUrl);
    const result = await response.json();

    const data = Object.values(result);
    
    return data
}

export const getAllSmartwatches = async() => {
  const response = await fetch(smartwatchesUrl);
  const result = await response.json();

  const data = Object.values(result);
  
  return data
}

export const getOneDevice = async (url,path, devId) => {

    const response = await fetch(`${url}${path}/${devId}`);
    const result = await response.json();

    return result;
}

