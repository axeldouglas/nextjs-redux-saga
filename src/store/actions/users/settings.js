import * as actionTypes from "../index.js";

export const settingsUpdateLang = (lang) => ({
  type: actionTypes.USER_SETTINGS_UPDATE_LANGUAGE,
  payload: lang,
});