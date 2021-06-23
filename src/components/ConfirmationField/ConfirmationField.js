import React from "react";

/*
  Confirmation field rendering

  Used to display record data in a standardised format
*/

const ConfirmationField = ({ fieldName, fieldContent }) => {
  // Capitalise content is present, else set to empty string
  fieldContent =
    fieldContent === undefined
      ? ""
      : fieldContent.substring(0, 1).toUpperCase() + fieldContent.substring(1);
  return (
    <div className="confirmationFieldContainer">
      <h5 className="confirmationFieldHeader">{fieldName}</h5>
      <p className="confirmationFieldContent">{fieldContent}</p>
    </div>
  );
};

export default ConfirmationField;
