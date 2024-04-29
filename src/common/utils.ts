export const getLocalStorageItemOrSetDefaultIfNone = (key: string, defaultValue: string) => {
  const value = localStorage.getItem(key);
  if (value) return value;
  localStorage.setItem(key, defaultValue);
  return defaultValue;
};
