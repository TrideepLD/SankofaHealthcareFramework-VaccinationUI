import {
  DatePicker,
  DatePickerInput,
  Modal,
  Select,
  SelectItem,
  TextArea,
  TextInput,
  ToastNotification,
} from "carbon-components-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addVaccination } from "../../reducers/vaccinationReducer";
import ConfirmationContent from "../ConfirmationContent";

/*
  Import and utilise service when integrating API
  import vaccinationServices from "../../services/vaccinationServices";
*/

//Initial state of registration data
const initialValues = {
  firstName: "",
  lastName: "",
  patientId: "",
  gender: "",
  pregnant: false,
  dateOfBirth: "",
  medicalConditions: "",
  provider: "",
  vaccine: "",
  scheduledAppointment: null,
};

const toastTimeout = 5000;

const Registration = ({ openModal, setOpenModal }) => {
  const [patientRegistration, setPatientRegistration] = useState(initialValues);
  const [confirmation, setConfirmation] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const dispatch = useDispatch();

  //Update registration details when changed in form
  const handleChange = (field, value) => {
    setPatientRegistration({ ...patientRegistration, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Iterate over each value - If blank, set to empty string to eliminate null/undefined errors
    const propertiesArray = Object.keys(patientRegistration);
    for (let property of propertiesArray) {
      if (
        property !== "medicalConditions" &&
        patientRegistration[property] === ""
      )
        return;
    }

    //Based on confirmation state, either toggle confirmation or create new vaccination record, clear form, set toast and close modal
    if (!confirmation) {
      setConfirmation(true);
    } else {
      dispatch(addVaccination(patientRegistration));
      setPatientRegistration(initialValues);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), toastTimeout);
      setOpenModal(false);
      setConfirmation(false);
    }

    /*
      To be implemented when the API layer has been finalised
      
       vaccinationServices.registration(patientRegistration)
      .then((data) => {
        setPatientRegistration(initialValues);
        setOpenModal(false);
        
      }).catch((error) => {
       console.log(error)
      })
    */
  };

  const handleCancel = () => {
    confirmation ? setConfirmation(false) : setOpenModal(false);
  };

  return (
    <>
      {toastVisible && (
        <div className="toastContainer">
          <ToastNotification
            kind="success"
            lowContrast={true}
            caption="Your request has been submitted to the provider."
            timeout={toastTimeout}
            title="Registration Submitted."
          />
        </div>
      )}
      <Modal
        open={openModal}
        modalHeading="Register a user for a vaccination"
        primaryButtonText={confirmation ? "Submit" : "Next"}
        secondaryButtonText={confirmation ? "Back" : "Cancel"}
        onRequestClose={handleCancel}
        onRequestSubmit={(e) => handleSubmit(e)}
      >
        {confirmation ? (
          <>
            <ConfirmationContent patientDetails={patientRegistration} />
          </>
        ) : (
          <>
            <p style={{ marginBottom: "1rem" }}>
              Submit a vaccination registration on behalf of a patient.
            </p>
            <TextInput
              className="registration-input"
              data-modal-primary-focus
              id="firstName"
              labelText="First Name"
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Joe"
              value={patientRegistration.firstName}
            />
            <TextInput
              className="registration-input"
              id="lastName"
              labelText="Last name"
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Citizen"
              value={patientRegistration.lastName}
            />
            <TextInput
              className="registration-input"
              id="patientId"
              labelText="Patient ID"
              onChange={(e) => handleChange("patientId", e.target.value)}
              placeholder="joe@ibm.com"
              value={patientRegistration.patientId}
            />

            <DatePicker
              className="registration-input"
              datePickerType="single"
              onChange={(e) => handleChange("dateOfBirth", e[0])}
              value={patientRegistration.dateOfBirth}
            >
              <DatePickerInput
                placeholder="mm/dd/yyyy"
                labelText="Date of birth"
                id="dob"
              />
            </DatePicker>

            <Select
              className="registration-input"
              id="gender"
              labelText="Gender"
              onChange={(e) => handleChange("gender", e.target.value)}
              value={patientRegistration.gender}
            >
              <SelectItem disabled hidden value="" text="Select an option" />

              <SelectItem value="Male" text="Male" />
              <SelectItem value="Female" text="Female" />
              <SelectItem value="Non-binary" text="Non-Binary" />
            </Select>
            {patientRegistration.gender === "Female" && (
              <Select
                className="registration-input"
                id="pregnant"
                labelText="Is the patient pregnant?"
                onChange={(e) => handleChange("pregnant", e.target.value)}
                value={patientRegistration.pregnant}
              >
                <SelectItem value={false} text="No" />
                <SelectItem value={true} text="Yes" />
              </Select>
            )}

            <TextArea
              className="registration-input"
              id="medicalConditions"
              labelText="Does the patient suffer from any medical conditions"
              onChange={(e) =>
                handleChange("medicalConditions", e.target.value)
              }
              placeholder="E.g. High blood pressure"
              value={patientRegistration.medicalConditions}
            />

            <TextInput
              className="registration-input"
              id="provider"
              labelText="Provider to register with"
              onChange={(e) => handleChange("provider", e.target.value)}
              placeholder="St. John's Hospital"
              value={patientRegistration.provider}
            />

            <Select
              className="registration-input"
              id="vaccine"
              labelText="Vaccine"
              onChange={(e) => handleChange("vaccine", e.target.value)}
              value={patientRegistration.vaccine}
            >
              <SelectItem disabled hidden value="" text="Select an option" />

              <SelectItem value="Polio" text="Polio" />
              <SelectItem value="Yellow-fever" text="Yellow Fever" />
              <SelectItem value="Smallpox" text="Smallpox" />
              <SelectItem value="COVID19" text="COVID-19" />
            </Select>
          </>
        )}
      </Modal>
    </>
  );
};

export default Registration;
