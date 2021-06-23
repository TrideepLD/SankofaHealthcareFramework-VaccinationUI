import {
  Modal,
  ToastNotification,
  DatePicker,
  DatePickerInput,
  TimePicker,
  TimePickerSelect,
  SelectItem,
} from "carbon-components-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { updateVaccination } from "../../reducers/vaccinationReducer";
import ConfirmationContent from "../ConfirmationContent";

/*
  Schedule modal component

  Handles display of modal contents, scheduling form, updating of vaccination record and toast notifications

*/

//Default toast settings
const toastTimeout = 5000;
const toastInitialState = {
  visible: false,
  kind: "",
  title: "",
  caption: "",
};

const ScheduleModal = ({ currentPatient, openModal, setOpenModal }) => {
  const [toast, setToast] = useState({ visible: false });
  const [scheduleDate, setScheduleDate] = useState();
  const [scheduleTime, setScheduleTime] = useState();
  const [scheduleAMPM, setScheduleAMPM] = useState("AM");
  const dispatch = useDispatch();

  //On submission, set selected appointment values and update state
  const handleSubmit = (e) => {
    e.preventDefault();
    currentPatient.scheduledAppointment = {
      date: scheduleDate.toLocaleDateString(),
      time: scheduleTime,
      AMPM: scheduleAMPM,
    };

    dispatch(updateVaccination(currentPatient));

    //Display toast and clear form
    if (scheduleDate && scheduleTime) {
      setToast({
        kind: "success",
        caption: `Appointment set for ${scheduleDate.toLocaleDateString()}, ${scheduleTime} ${scheduleAMPM}`,
        visible: true,
        title: "Appointment Set.",
      });
      setTimeout(() => setToast(toastInitialState), toastTimeout);
      setOpenModal(false);

      setScheduleDate();
      setScheduleTime();
      setScheduleAMPM("AM");
    } else {
      setToast({
        kind: "error",
        caption: `Please set a valid time.`,
        visible: true,
        title: "Error.",
      });
      setTimeout(() => setToast(toastInitialState), toastTimeout);
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

  const setDate = (e) => {
    setScheduleDate(e[0]);
  };

  const setTime = (e) => {
    setScheduleTime(e.target.value);
  };

  const setAMPM = (e) => {
    setScheduleAMPM(e.target.value);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };

  return (
    <>
      {toast.visible && (
        <div className="toastContainer">
          <ToastNotification
            kind={toast.kind}
            lowContrast={true}
            caption={toast.caption}
            timeout={toastTimeout}
            title={toast.title}
          />
        </div>
      )}
      {currentPatient && (
        <Modal
          open={openModal}
          modalHeading="Schedule a date."
          primaryButtonText="Schedule"
          secondaryButtonText="Exit"
          onRequestSubmit={(e) => handleSubmit(e)}
          onRequestClose={(e) => closeModal(e)}
        >
          <>
            <p style={{ marginBottom: "1rem" }}>
              <DatePicker
                datePickerType="single"
                onChange={(e) => setDate(e)}
                value={scheduleDate}
              >
                <DatePickerInput
                  placeholder="mm/dd/yyyy"
                  labelText="Select a date for the vaccination"
                  id="date-picker-single"
                />
              </DatePicker>
              <TimePicker
                id="time-picker"
                onChange={(e) => setTime(e)}
                value={scheduleTime}
              >
                <TimePickerSelect
                  id="time-picker-select-1"
                  onChange={(e) => setAMPM(e)}
                  value={scheduleAMPM}
                >
                  <SelectItem value="AM" text="AM" />
                  <SelectItem value="PM" text="PM" />
                </TimePickerSelect>
              </TimePicker>
            </p>

            <ConfirmationContent patientDetails={currentPatient} />
          </>
        </Modal>
      )}
    </>
  );
};

export default ScheduleModal;
