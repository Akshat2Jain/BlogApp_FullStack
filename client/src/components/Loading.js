import React from "react";
import LoadingSpin from "react-loading-spin";
import "../App.css";

const Loading = () => {
  return (
    <>
      <div className="loading">
        <LoadingSpin primaryColor="dodgerblue" duration="1s" />
      </div>
    </>
  );
};

export default Loading;
