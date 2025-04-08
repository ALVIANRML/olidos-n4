import React, { useContext } from "react";
import { AppContext } from "../assets/context/AppContext";

export default function Route() {
  //Context Route
  const { route } = useContext(AppContext);

  const renderPage = () => {
    switch (route) {
      case "dashboard":
        return "Hai";
      case "au31":
        return "ini au 31";
      default:
        return "<MainDashboard />";
    }
  };

  return <>{renderPage()}</>;
}
