export const SETTINGS_SET_DATA = 'settings/SET_DATA';

export const setData = (data) => ({ type: SETTINGS_SET_DATA, payload: { ...data }});