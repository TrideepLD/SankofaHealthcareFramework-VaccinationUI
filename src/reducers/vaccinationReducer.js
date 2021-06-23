import vaccinationData from "../sampleData/vaccinations";

/*
  Manage vaccination records
*/

const ADD_VACCINATION = "ADD_VACCINATION";
const UPDATE_VACCINATION = "UPDATE_VACCINATION";

const initialState = vaccinationData;

//Keep track of destination IDs
let nextID = initialState.length + 1;

//Get next ID to use, increment variable and return value
const getNextID = () => {
  const tempID = nextID;
  nextID += 1;
  return tempID.toString();
};

const vaccinationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VACCINATION:
      return [...state, action.data];

    case UPDATE_VACCINATION:
      const updatedVaccinations = state.map((vax) =>
        vax.id !== action.data.id ? vax : action.data
      );
      return updatedVaccinations;
    default:
      return state;
  }
};

export const addVaccination = (vaccinationData) => {
  const id = getNextID();
  vaccinationData.id = id;
  vaccinationData.dateOfBirth =
    vaccinationData.dateOfBirth.toLocaleDateString();
  vaccinationData.request = "Pending";

  return {
    type: ADD_VACCINATION,
    data: vaccinationData,
  };
};

export const updateVaccination = (vaccination) => {
  return {
    type: UPDATE_VACCINATION,
    data: vaccination,
  };
};

export default vaccinationReducer;
