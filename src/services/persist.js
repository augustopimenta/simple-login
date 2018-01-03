const STORAGE_KEY = 'simple-login/state';

export const saveData = (data) => {
    return new Promise((resolve, reject) => {
        if (window.hasOwnProperty('chrome')) {
            chrome.storage.sync.set(data, () => {
                if (chrome.runtime.lastError) {
                    reject();
                } else {
                    resolve();                
                }
            });
        } else if (window.hasOwnProperty('localStorage')) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
                resolve();
            } catch (err) {
                reject(err);
            }
        } else {
            resolve();
        }
    });
};

export const getData = () => {
    return new Promise((resolve, reject) => {
        if (window.hasOwnProperty('chrome')) {
            chrome.storage.sync.get(data => {
                if (chrome.runtime.lastError) {
                    reject();
                } else {
                    resolve(data ? data : undefined);                
                }
            });
        } else if (window.hasOwnProperty('localStorage')) {
            try {
                const data = JSON.parse(localStorage ? localStorage.getItem(STORAGE_KEY) : {});
                resolve(data ? data : undefined)
            } catch (err) {
                reject(err)
            }
        } else {
            resolve(undefined);
        }
    });
}


export const updateDataStructure = () => {
    return new Promise(resolve => {
        if (window.hasOwnProperty('chrome')) {
            chrome.storage.sync.get(data => {
                if (!data) {
                    const localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY));

                    if (localStorageData) {
                        chrome.storage.sync.set(localStorageData, () => {
                            resolve();
                        });

                        localStorage.clear();
                    } else {
                        resolve();
                    }
                } else {
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
};