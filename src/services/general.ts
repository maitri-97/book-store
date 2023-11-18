export const getStorageData = (key: string) => {
   let storageData =  localStorage.getItem(key) || '';
   return storageData;
}

export const setStorageData = (key:string, value:string) => {
    localStorage.setItem(key, value);
}