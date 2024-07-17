import React from "react";

const Balance = ({ balance }) => {
  return (
    <div className="text-muted-foreground">
      Balance: <span className="font-medium">${balance.toFixed(2)}</span>
    </div>
  );
};

export default Balance;
