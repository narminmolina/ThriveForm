# Code Challenge Instructions

This project consists of a backend Rails application and a frontend application. Follow the steps below to set up and run both applications locally.

## Backend Setup

1. Open your terminal and navigate to the backend directory.

2. **Run the Following Commands:**

   rails db:migrate

   rails s

   rails db:seed

The backend server should now be running on http://localhost:3000.

## Frontend Setup

1. Navigate to frontend folder
2. **Run the Following Commands:**

   pnpm install

   pnpm run dev

   (if you don't have pnpm in local set up use npm instead)

Open http://localhost:5173 in your browser. You should see two reservation cards displayed on the UI

## Tasks:

1. Attempt to create, edit, and delete a reservation.

While creating a reservation, you will encounter a server error below and created record will not appear on the UI until you reload the window
NoMethodError in Api::ReservationsController#create

Investigate and resolve this bug to ensure the create functionality works without any server errors when values have been filled.

1. Modify the form to suppress browser validations and ensure that only the custom validation messages are shown.

We have implemented custom validations on the schema in ReservationForm.tsx (e.g., lines 17 and 25) to display validation error messages instead of the browser's default validations. However, browser validation messages are still appearing. See if you can disable browser validations

3. The email field is intended to be optional, but submitting the form without an email currently results in a server error.

Update code to handle this scenario correctly, ensuring that the form can be submitted without an email.

4. The "Reservation Type" field is required, but currently, the form allows submission without selecting a type, resulting in a network request and an alert indicating failure.

Implement client-side validation to prevent form submission until a reservation type is selected, and display an appropriate validation message.

5. Implement a custom validation on the Reservation Date field to ensure that users cannot submit a date earlier than today.

TIP: Refer to the custom phone validation implemented in ReservationForm.tsx around line 27 for guidance.
