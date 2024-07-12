// Import React library
import React from "react";

// Import Coupons component
import Coupons from "../components/Coupons";

// Define the CouponsPage component
const CouponsPage = () => {
  return (
    // Wrapper div with full height and width
    <div className="h-[100%] w-[100%]">
      {/* Render the Coupons component */}
      <Coupons />
    </div>
  );
};

// Export the CouponsPage component as the default export
export default CouponsPage;
