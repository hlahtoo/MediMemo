# MediMemo (Version 2 - Upgraded)

This is a continuation of our previous Medimemo Application. It focuses on making the application more usable and accessible for everyone. Additionally, it features a new design that makes it easier and faster to use.

## Authors

Hla Htoo and Vicki Diaz

## Submission 
- turned in on-time for first set deadline by professor
- Date Turned In: 11/8/23
## Project Links

Please refer the links below for more details on the design

Deployed Site: https://medimemo2-0.onrender.com/

Walkthrough Video: https://youtu.be/DhrMyd-ph0M?feature=shared

Slides: https://docs.google.com/presentation/d/1YWXesMCL6IqQcE3hzP7l2Il82Qg0GneY6mioO5sB38k/edit?usp=sharing

Design Document: [Click to view the design document](MediMemo/designDocument/Project-3-design-document.pdf)

Class Link: https://johnguerra.co/classes/webDevelopment_fall_2023/

## Project Objective

Medimemo is an online platform designed for healthcare providers to optimize the management of electronic health records and appointment scheduling. This platform ensures secure storage of health records and facilitates effortless scheduling, enhancing overall efficiency in healthcare management. This platform makes it easy to search and filter through a large database of patients and appointments.

## Disclaimer

All data in this project is fictitious and for educational and demonstration purposes only. It does not represent real healthcare records or individuals. Please use responsibly and ethically.

## Changes Made

The following are changes that make this version of Medimemo differnt and more usable/asseable to the previous version. Changes were influenced by user test studies (3 per team memeber).

- Added two types typography
- Implemented color palette on all pages
- Implemented passport.js for user authentication
- 100% accessibility on Lighthouse to ensure accessibility
- Make the whole website accessible with keyboard including focusing to the first input element when opening the form using useRef
- Completely modify login/signup page to meet the standard forms such as confirming password to register
- Completely redesign the all forms (style and structure)
- Made forms and search placeholders more informative
- Created pop up messages Instead of using alert(“”) function to notify if task was successful or not
- Made the information pages unaccessible if user hasn’t logged in
- Rearranged the buttons to create a visual hierarchy
- Updated Scheduling page to guide a user on creating an appointment
  - Have calandar and form side by side.

## Color Palette

<img width="1322" alt="Color_Palette" src="https://github.com/hlahtoo/MediMemo/assets/88179209/8f041692-44a9-4137-ab99-912cddb4a231">

## Typography

- MANROPE
- PLAYFAIR DISPLAY

## Functionalities/How to use

- Landing Page:
  - Welcomes user to application and gives option to login or sign up
- Create an account:
  - User is able to sign up and user credentials to sign back in.
- Patient Page:
  - Lets a user CREATE/add a new patient and create a new health record for the patient
  - Search bar lets you filter through all patients to find specific patient
  - Clicking on a patient takes you to their health record
  - In health record, user is able to UPDATE and DELETE a health record
- Schedule Page:
  - Lets a user CREATE/add a new appointment.
  - Search bar lets you filter through all appointments
    - you can filter by typing the following details:
      - Patient name
      - Doctor name
      - Date
      - Why (reason for appointment)
  - After creating an apointment a card is made and presented at end of page
  - User is able to DELETE and UPDATE appointment

## CRUD OPERATIONS

### Hla Htoo

1. CREATE
   - Whenever a user clicks on "Add new patient" button, user is able to create a new patient.
   - Log-in/Sign-up(Register) creates users. Added to users collections in database
2. READ
   - On the patient page, all the data shown is fetched from collection named "patients" in database.
3. UPDATE
   - Once in a specific helath record page, the "update" button lets user update the health record. The update also updates the patient collection in database.
4. DELETE
   - Once in a specific helath record page, the "delete" button lets user delete the patient. It also deletes patient collection in database.

We have a collection of 1k health records in our database (meets project rubric requirements)

### Vicki Diaz

1. CREATE
   - User can fill out "New Appointment" to create a new appointment and a appointment card is created in "Scheduled Appointments" section. When submitted, a new appointment is craeted and added to "appointment" collection in data base.
2. READ
   - On the scheduling page, all the data shown is fetched from collection named "appointments" in database.
3. UPDATE
   - The "update" button (found on each appointment card) lets you update the appointment details. The update also updates the appointment collection in database.
4. DELETE
   - Clicking the "delete" button (found on each appointment card) lets user delete the appointment. It also deletes appointment collection in database. User is presented with warning message before deleting.

## How to Install

1. Clone repository
2. cd to the cloned folder and type command "npm i"
   - this will run npm preinstall automatically which includes these three commands "cd front && npm install && npm run build"
3. npm start
4. Go to localhost:3000

## Technologies Used

1. ReactJS
2. JavaScript
3. CSS3
4. HTML
5. Express
6. NodeJs
7. MongoDB

## Screenshots

Logo:

<img width="156" alt="Screenshot 2023-11-08 at 8 50 40 AM" src="https://github.com/hlahtoo/MediMemo/assets/88179209/39089d36-3c9e-4c51-b5e9-8f47226e70e3">

Landing Page:

<img width="1171" alt="LandingPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/eaa6c31e-adda-4c83-b7b2-689d85498d5e">

Log-in Page:

<img width="1155" alt="LoginPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/b5d6b019-b1a0-4f33-a250-e784030a8393">

Register Page:
<img width="1152" alt="RegisterPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/d25e08e2-0a11-43b6-b691-00869ac20ae1">

### Patient Pages

Main Patient Page:

<img width="1197" alt="P-GeneralPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/63f4faa9-7949-4bf6-8116-1ab97cd8fe02">

Adding New Patient Feature:

<img width="582" alt="P-AddPatientForm" src="https://github.com/hlahtoo/MediMemo/assets/88179209/9af7f13d-e449-4528-bfc5-7b254689fb72">

Patient Record Page:

<img width="1202" alt="P-PatientRecordsPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/3d940b18-f534-4cd9-94f4-269680ab4134">

Update Patient Form:

<img width="584" alt="P-UpdatePatientPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/c5e46649-9f91-4fce-b373-4062348622de">

### Scheduling Page

Main Scheduling Page/Create Appointment Form:

<img width="1284" alt="S-GeneralPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/6988e0bc-816f-415e-ae9b-1e127dcddb39">

Appointment Display:

<img width="1279" alt="S-AppointmentDisplay" src="https://github.com/hlahtoo/MediMemo/assets/88179209/d2c6b3c5-f133-4ce4-a86d-15489daa9373">

Update Appointment Form Feature:

<img width="580" alt="S-UpdateAppointmentForm" src="https://github.com/hlahtoo/MediMemo/assets/88179209/aef20a88-421e-4d12-a23f-a0d3f64e8a18">

Delete Warning Message:

<img width="1023" alt="S-DeleteMsg" src="https://github.com/hlahtoo/MediMemo/assets/88179209/ab1a45c2-8cab-4ebf-b900-67a802ffaa47">
