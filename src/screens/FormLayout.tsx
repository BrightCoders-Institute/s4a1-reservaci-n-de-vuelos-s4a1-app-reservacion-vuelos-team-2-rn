import React, { useState } from "react";
import { View, Text, Button } from "react-native";

import FromScreen from "../screens/FromScreen";
import PassengerScreen from "../screens/PassengerScreen";
import ToScreen from "../screens/ToScreen";

const Layout = () => {
  const [screen, setScreen] = useState(0);
  //  const [data, setData] = useState(2);

  // const screens = [<FromScreen changeScreen={changeScreen }/>, <PassengerScreen />, <ToScreen />];

  function changeScreen() {
    setScreen(screen + 1);
  }

  return(
    <>
      {/* {screens[screen]} */}
    </>
  );
}

export default Layout;

/**
 * const [screen, setScreen] = useState(0);
 * function setNewScreen{
 * setScreen(screen+1);
 * screens = [<screen1>, <cew>]
 * return screens(screen);
 * }
 * 
 * const layout = () {
 * return (setNewScreen);
 * }
 */