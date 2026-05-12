"use client";

import { createContext, useContext, useState } from "react";
import { shuffle } from "../helpers";
import { allButtons } from "../data/libraries";

const ButtonsContext = createContext();

export function ButtonsProvider({ children }) {
  // Initially set state to shuffled buttons
  const [buttons, setButtons] = useState(shuffle(allButtons));

  return (
    <ButtonsContext.Provider value={{ buttons, setButtons }}>
      {children}
    </ButtonsContext.Provider>
  );
}

export const useButtonsContext = () => useContext(ButtonsContext);
