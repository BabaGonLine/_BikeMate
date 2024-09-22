//Check if item exist in local storage
//not overwrite if set to overwrite false
export const setLocalStorage = (storageKey, storageItem, override = true) => {
  console.log(storageKey, storageItem, override);
  if (!storageKey || !storageItem || storageItem.length === 0) {
    throw new Error("no data avail");
  }

  let items = JSON.parse(localStorage.getItem(storageKey));
  if (!items) {
    items = {};
  }

  const newItems = { ...items, ...storageItem };
  const keyExist = Object.keys(items).find(
    (i) => i === Object.keys(storageItem)[0]
  );

  if (!keyExist || (keyExist && override)) {
    localStorage.setItem(storageKey, JSON.stringify(newItems));
  }
  const updatedStorage = JSON.parse(localStorage.getItem(storageKey));
  return updatedStorage;
};

// for first load of application
export function initLocalStorage(langBase) {
  const items = JSON.parse(localStorage.getItem("language"));
  if (items) {
    return;
  }
  setLocalStorage("language", { dictionary: langBase }, true);

  //   setLocalStorage("language", { lang: "US" }, true);
  //   //load translation
  //   import("./translation/US.js").then((res) => {
  //     setLocalStorage("language", { dictionary: res.Languge }, true);
  //   });
}

export const getTranslation = (name, category = "") => {
  try {
    const items = JSON.parse(localStorage.getItem("language"));
    let retTranslation = category
      ? items.dictionary[category][name]
      : items.dictionary[name];

    return retTranslation;
  } catch (error) {
    console.log(name, category);
    return new Error("not found");
  }
};
