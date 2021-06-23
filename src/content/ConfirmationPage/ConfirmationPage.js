import React, { useState } from "react";
import { useSelector } from "react-redux";
import ConfirmTable from "./ConfirmTable";
import Registration from "../../components/Registration";

import { Pagination } from "carbon-components-react";

import Approval from "../../components/Approval/Approval";
import ScheduleModal from "../../components/ScheduleModal/ScheduleModal";
import ViewDetails from "../../components/ViewDetails/ViewDetails";

//The headers/columns to be displayed in the table
import headers from "./headers";

/*
  Confirmation Screen

  Retrieves vaccination records, initiates primary table for displaying records and manages all modals
  
*/

const ConfirmationPage = () => {
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [openApprovalModal, setOpenApprovalModal] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const user = useSelector((state) => state.authenticatedUser);

  //Filter vaccination records based on authenticated user's role
  //If a patient (0) only return their records, else return all records
  const vaccinationData = useSelector((state) => {
    if (user.role === 0) {
      return state.vaccinations.filter((vax) => vax.patientId === user.id);
    }

    return state.vaccinations;
  });

  //Find selected patient, set state and launch modal
  const approvePatient = (patientID) => {
    const patientValues = {
      ...vaccinationData.find((patient) => patient.id === patientID),
    };

    setOpenApprovalModal(!openApprovalModal);
    setCurrentPatient(patientValues);
  };

  const schedulePatient = (patientID) => {
    const patientValues = {
      ...vaccinationData.find((patient) => patient.id === patientID),
    };

    setOpenScheduleModal(!openScheduleModal);
    setCurrentPatient(patientValues);
  };

  const viewDetails = (patientID) => {
    const patientValues = {
      ...vaccinationData.find((patient) => patient.id === patientID),
    };

    setOpenViewDetails(!openScheduleModal);
    setCurrentPatient(patientValues);
  };

  return (
    <div className="bx--grid bx--grid--full-width bx--grid--no-gutter conf-page">
      <div className="bx--row conf-page__r1">
        <div className="bx--col-lg-16">
          <ConfirmTable
            headers={headers}
            rows={vaccinationData.slice(
              firstRowIndex,
              firstRowIndex + currentPageSize
            )}
            setOpenRegistrationModal={() =>
              setOpenRegistrationModal(!openRegistrationModal)
            }
            approvePatient={approvePatient}
            schedulePatient={schedulePatient}
            viewDetails={viewDetails}
          />
          <Pagination
            totalItems={vaccinationData.length}
            backwardText="Previous page"
            forwardText="Next page"
            pageSize={currentPageSize}
            pageSizes={[5, 10, 15, 25]}
            itemsPerPageText="Patients per page"
            onChange={({ page, pageSize }) => {
              if (pageSize !== currentPageSize) {
                setCurrentPageSize(pageSize);
              }
              setFirstRowIndex(pageSize * (page - 1));
            }}
          />
          <Registration
            openModal={openRegistrationModal}
            setOpenModal={setOpenRegistrationModal}
          />
          <Approval
            currentPatient={currentPatient}
            openModal={openApprovalModal}
            setOpenModal={setOpenApprovalModal}
          />

          <ScheduleModal
            currentPatient={currentPatient}
            openModal={openScheduleModal}
            setOpenModal={setOpenScheduleModal}
          />

          <ViewDetails
            currentPatient={currentPatient}
            openModal={openViewDetails}
            setOpenModal={setOpenViewDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
