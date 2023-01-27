import React, { useEffect } from "react";

export const useTabFocus = (onFocus: () => void, onBlur: () => void) => {
  useEffect(() => {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  });
};
