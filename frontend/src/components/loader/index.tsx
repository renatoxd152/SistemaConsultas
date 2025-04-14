import React from "react";
import "./Loader.css";

interface LoaderProps {
  show: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ show }) => {
  if (!show) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};
