import { Modal, ToastNotification } from "carbon-components-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import ConfirmationContent from "../ConfirmationContent";
import { updateVaccination } from "../../reducers/vaccinationReducer";

/*
  Approval modal component

  Handles display of modal contents, updating of record approval status and toast notifications

*/

//Default toast settings
const toastTimeout = 5000;
const toastInitialState = {
  visible: false,
  kind: "",
  title: "",
  caption: "",
};

const Approval = ({ currentPatient, openModal, setOpenModal }) => {
  const [toast, setToast] = useState({ visible: false });
  const dispatch = useDispatch();

  // Handle the press of modal Approve and Deny buttons
  const handleSubmit = (e, approve) => {
    e.preventDefault();

    //Update vaccination record with selected status
    currentPatient.request = approve ? "Approved" : "Declined";
    dispatch(updateVaccination(currentPatient));

    //Display tost based on status approval status
    if (approve) {
      setToast({
        kind: "success",
        caption: "The vaccination request has been approved.",
        visible: true,
        title: "Request Approved.",
      });
    } else {
      setToast({
        kind: "error",
        caption: "The vaccination request has been denied.",
        visible: true,
        title: "Request Denied.",
      });
    }

    //Refresh toast and close modal
    setTimeout(() => setToast(toastInitialState), toastTimeout);
    setOpenModal(false);

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
          modalHeading="Approve a vaccination request"
          primaryButtonText="Approve"
          secondaryButtonText="Decline"
          onSecondarySubmit={(e) => handleSubmit(e, false)}
          onRequestSubmit={(e) => handleSubmit(e, true)}
          onRequestClose={(e) => closeModal(e)}
        >
          <>
            <ConfirmationContent patientDetails={currentPatient} />
          </>
        </Modal>
      )}
    </>
  );
};

export default Approval;
