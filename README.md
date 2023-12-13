# MediMemo (Version 2 - Upgraded)

## Authors

Hla Htoo and Vicki Diaz

## Project Links

Please refer the links below for more details on the design

Deployed Site: ADD

Walkthrough Video: ADD

Slides: https://docs.google.com/presentation/d/1YWXesMCL6IqQcE3hzP7l2Il82Qg0GneY6mioO5sB38k/edit?usp=sharing

Design Document: [Click to view the design document](MediMemo/designDocument/Project-3-design-document.pdf)

Class Link: https://johnguerra.co/classes/webDevelopment_fall_2023/

## Project Objective

Medimemo is an online platform designed for healthcare providers to optimize the management of electronic health records and appointment scheduling. This platform ensures secure storage of health records and facilitates effortless scheduling, enhancing overall efficiency in healthcare management. This platform makes it easy to search and filter through a large database of patients and appointments.

## Disclaimer

All data in this project is fictitious and for educational and demonstration purposes only. It does not represent real healthcare records or individuals. Please use responsibly and ethically.

## Changes Made

ADD

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
  - Lets a user create/add a new appointment by clicking a date on the calander and filling out a form
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
   - Log-in/Sign-up creates users. Added to users collections in database
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
2. cd to the cloned folder
3. npm install
4. cd front => npm install => npm run build
5. cd .. => npm start
6. go to localhost:3000

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

Welcome Page:
<img width="1206" alt="welcomePage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/3c461aa9-c59b-4865-bf9d-6eab9ec775b5">

Log-in Page:
<img width="1210" alt="log-inPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/da99df4a-140d-43c6-85bc-617b3e54433b">

Sign-UP Page:
<img width="1202" alt="sign-upPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/663d863a-e712-4821-ba50-d168b5dc798b">

### Patient Pages

Main Patient Page:
<img width="1195" alt="P-GeneralPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/17e6e232-7c96-472a-92cc-95bee7d86bf7">

Adding New Patient Feature:
<img width="1194" alt="P-AddNewPatientForm" src="https://github.com/hlahtoo/MediMemo/assets/88179209/031d6ce0-d026-4c50-b0ac-96b031acd191">

Patient Record Page:
<img width="1190" alt="P-PatientRecordPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/4a2da040-77f1-41ae-b796-bfde8ac2d066">

Search Patient Feature Example:
<img width="1196" alt="P-SearchingFeatureExample" src="https://github.com/hlahtoo/MediMemo/assets/88179209/857cc9ed-2dab-41ad-84e1-4afa22cbb8bf">

### Scheduling Page

Main Scheduling Page:
<img width="1433" alt="S-GeneralPage" src="https://github.com/hlahtoo/MediMemo/assets/88179209/ee010e3d-d11a-476c-9940-322521c5c3b6">

Create Appointment Form:
<img width="1425" alt="S-CreateAppointmentForm" src="https://github.com/hlahtoo/MediMemo/assets/88179209/53fc67a4-6fdc-4bbd-81b4-73dca6dfe2cc">

Update Appointment Form Feature:
<img width="1423" alt="S-UpdateFormExample" src="https://github.com/hlahtoo/MediMemo/assets/88179209/b8e8fc3e-93a9-489c-aee7-4186bbad54fc">

Search Appointment Feature Example:
<img width="1422" alt="S-SearchingFeature" src="https://github.com/hlahtoo/MediMemo/assets/88179209/c95a7a6a-3ddb-4e48-a520-85c240ee87e9">
