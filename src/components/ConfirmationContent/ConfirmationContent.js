import React from "react";
import ConfirmationField from "../ConfirmationField";

/*
  Confirmation Content rendering

  Displays the data of the patient in a standard format
  Used by several modals for displaying records
*/

const ConfirmationContent = ({ patientDetails }) => {
  //Returns date of birth as string
  const getDateOfBirth = () => {
    return typeof patientDetails.dateOfBirth === "string"
      ? patientDetails.dateOfBirth
      : patientDetails.dateOfBirth.toLocaleDateString();
  };

  return (
    <>
      {patientDetails.scheduledAppointment && (
        <div
          style={{
            borderBottom: "1px solid black",
            marginBottom: "1rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <h5>Appointment Details</h5>
          </div>
          <ConfirmationField
            fieldName="Date"
            fieldContent={patientDetails.scheduledAppointment.date}
          />

          <ConfirmationField
            fieldName="Time"
            fieldContent={
              patientDetails.scheduledAppointment.time +
              " " +
              patientDetails.scheduledAppointment.AMPM
            }
          />
        </div>
      )}
      <div>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <h5>Patient Details</h5>
        </div>
        <ConfirmationField
          fieldName="Patient Name"
          fieldContent={`${patientDetails.firstName} ${patientDetails.lastName}`}
        />
        <ConfirmationField
          fieldName="Patient ID"
          fieldContent={`${patientDetails.patientId}`}
        />

        <ConfirmationField
          fieldName="Gender"
          fieldContent={patientDetails.gender}
        />

        <ConfirmationField
          fieldName="Pregnant"
          fieldContent={
            patientDetails.gender === "Male"
              ? "N/A"
              : patientDetails.pregnant
              ? "Yes"
              : "No"
          }
          hidden={patientDetails.gender !== "Female"}
        />

        <ConfirmationField
          fieldName="Date of Birth"
          fieldContent={getDateOfBirth()}
        />
        <ConfirmationField
          fieldName="Medical Conditions"
          fieldContent={patientDetails.medicalConditions}
        />
        <ConfirmationField
          fieldName="Provider"
          fieldContent={patientDetails.provider}
        />
        <ConfirmationField
          fieldName="Vaccine"
          fieldContent={patientDetails.vaccine}
        />
      </div>
    </>
  );
};

export default ConfirmationContent;
