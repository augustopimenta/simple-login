const STORAGE_KEY = 'simple-login/state';

export const saveData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (err) {}
};

export const getData = () => {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        
        return data ? data : undefined;
    } catch (err) {
        return undefined;
    }
}