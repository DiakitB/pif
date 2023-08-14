import { useState, useEffect } from "react";

export function useLocalStorage(key) {
  const [watched, setWatched] = useState(function () {
    const storeValue = localStorage.getItem(key);
    return JSON.parse(storeValue);
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(watched));
    },
    [watched, key]
  );
  return { watched, setWatched };
}
