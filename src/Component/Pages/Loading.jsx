import React from "react";

const Loading = () => {
  const style = {
    width: "100%",
    height: "60vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="loading" style={style}>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  );
};

export default Loading;
