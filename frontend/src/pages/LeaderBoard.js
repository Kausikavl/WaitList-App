import React from "react";
import Score from "../components/Score"; // Importing Score component

const CouponsPages = ({ socket }) => {
  
  return (
    // Main container div for CouponsPages component with full height and width
    <div className="h-[100%] w-[100%]">
      {/* Render the Score component */}
      <Score socket={socket} />
    </div>
  );
};

export default CouponsPages;
