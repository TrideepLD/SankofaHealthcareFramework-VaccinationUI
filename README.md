# IBM Sankofa Healthcare Project
## Vaccination User Interface
### Vaccination UI

This project contains the frontend user interface for vaccination UI for Sankofa Healthcare Framework.

The Sankofa Healthcare Framework is a private Blockchain Platform system for Healthcare for sensitive, including interoperable data warehouses through standards-based APIs.

This project forms one of many components of the SHF, with other components including the Administration UI, API, Blockchain Backend and Database.

The project is built using [React JS](https://reactjs.org/), as well as [Carbon UI](https://www.carbondesignsystem.com/) as an interface library and design system.


### Repository Structure

    ├── public    ├── images         ├── ibm.png   
    ├             ├──favicon.ico
    ├             ├──index.html
    ├             ├──manifest.json
    ├             ├──robots.txt
    ├                        
    ├── src       ├── components     ├── Approval            ├──Approval.js
    ├                                                        ├──approval.scss
    ├                                                        ├──index.js
    ├                                                        ├──mixins.scss
    ├
    ├                                ├── ConfirmationContent ├──ConfirmationContent.js
    ├                                                        ├──index.js
    ├                         
    ├                                ├── ConfirmationField   ├──ConfirmationField.js
    ├                                                        ├──confirmationField.scss
    ├                                                        ├──index.js
    ├                             
    ├                                ├── Registration        ├──index.js
    ├                                                        ├──mixins.scss
    ├                                                        ├──Registration.js
    ├                                                        ├──registration.scss
    ├
    ├                                ├── ScheduleModal       ├──index.js
    ├                                                        ├──mixins.scss
    ├                                                        ├──schedule.scss
    ├                                                        ├──ScheduleModal.js
    ├
    ├                                ├── ShellHeader         ├──index.js
    ├                                                        ├──shell-header.scss
    ├                                                        ├──ShellHeader.js
    ├
    ├                                ├── ViewDetails         ├──index.js
    ├                                                        ├──mixins.scss
    ├                                                        ├──ViewDetails.js
    ├                                                        ├──viewDetails.scss
    ├
    ├             ├── content        ├── ConfirmationPage    ├──_confirmation-page.scss
    ├                                                        ├──ConfirmationPage.js
    ├                                                        ├──ConfirmTable.js
    ├                                                        ├──headers.js
    ├                                                        ├──index.js
    ├
    ├                                ├── LandingPage         ├──_landing-page.scss
    ├                                                        ├──index.js
    ├                                                        ├──LandingPage.js 
    ├                         
    ├                                ├── LoginPage           ├──_login-page.scss
    ├                                                        ├──_mixins.scss
    ├                                                        ├──index.js
    ├                                                        ├──LoginPage.js
    ├                                                       
    ├             ├── reducers       ├──authenticatedUserReducer.js
    ├                                ├──vaccinationReducer.js
    ├                               
    ├             ├── sampleData     ├──users.js
    ├                                ├──vaccination.js
    ├ 
    ├             ├── services       ├──loginServices.js
    ├                                ├──vaccinationServices.js
    ├             ├──App.js
    ├             ├──app.scss
    ├             ├──index.js
    ├             ├──index.scss
    ├             ├──store.js
    ├
    ├
    ├ 
    ├──.env         
    ├──.gitignore
    ├──README.md
    ├──package-lock.json
    ├──package.json
    └──yarn.lock   


### Libraries
| Package name                                  | Description                                                                                                                                                                                                                                   |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`react`](https://reactjs.org/)  | A JavaScript library for building user interfaces |
| [`react-redux`](https://react-redux.js.org/)     | React UI bindings layer for Redux. |
| [`react-router-dom`](https://react-redux.js.org/)     | React Library that allows for dynamic routing. |
| [`carbon-design-system`](https://www.carbondesignsystem.com/)  | IBM’s open source design system |
| [`carbon-components-react`](https://github.com/carbon-design-system/carbon/tree/main/packages/react)  | Carbon's React components |



### Project Status
This project serves as the first iteration of the SHF Vaccination UI, and is still under active development. A scalable React structure has been created, as well as a number of screens and modals.

These are the following screens and functionalities present in the application currently:
- Login
- Landing Page
- Confirmation Page
    - Registering Patients
    - Approving Patients for a Vaccination
    - Scheduling Date of Vaccination for Patients 

These screens currently contain hardcoded demonstration data. As such, the next iteration of the SHF Admin UI project should focus on integrating the API with the Vaccination UI so that real data is displayed.

### Custom Components

#### [Approval](vaxui/src/components/Approval)
Modal Component
Handles display of modal contents, updating of record approval status and toast notifications

#### [ConfirmationContent](vaxui/src/components/ConfirmationContent)
Field Rendering Component 
Displays the data of the patient in a standard format. Used alongside modals for displaying records

#### [ConfirmationField](vaxui/src/components/ConfirmationField)
Field Rendering Component
Used to display record data in a standardised format

#### [Registration](vaxui/src/components/Registration)
Modal Component
Used to register new users/patients.

#### [ScheduleModal](vaxui/src/components/ScheduleModal)
Modal Component
Handles display of modal contents, scheduling form, updating of vaccination record and toast notifications

#### [ShellHeader](vaxui/src/components/ShellHeader)
Header Component
Displays the outer UI shell of the application including menu bar/items and side bar/items to enable navigation

#### [ViewDetails](vaxui/src/components/ViewDetails)
Modal Component
Handles display of modal contents i.e. Data related to the selected vaccination record


### Screens

#### [Confirmation Page](vaxui/src/content/ConfirmationPage)
Retrieves vaccination records, initiates primary table for displaying records and manages all modals

#### [Landing Page](vaxui/src/content/LandingPage)
*To be done by future teams

#### [Login Page](vaxui/src/content/LoginPage)
Display form for logging into the application and handle authentication process
