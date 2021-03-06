/*global chrome*/

const forExtension = callback => {
    if (window.hasOwnProperty('chrome'))
        callback(chrome);
};

export const getActiveTab = callback => {
    forExtension(chrome => {
        chrome.tabs.query({active: true, currentWindow: true}, tab => {
            callback(tab[0]);
        });
    });
};

export const changeTabUrl = (id, url) => {
    forExtension(chrome => {
        chrome.tabs.update(id, { url });
    });
};

export const createTab = url => {
    forExtension(chrome => {
       chrome.tabs.create({ url });
    });
};

export const closeExtension = () => {
    forExtension(() => {
        window.close();
    });
};