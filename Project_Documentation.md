# Medical Reminder System - Project Documentation

## Problem Statement
Many people forget to take their medications on time, which can lead to health complications. There is a need for a system that reminds users to take their medicines, tracks their medication schedules, and provides notifications to ensure timely intake.

## Objectives
- Help users manage and track their medication schedules.
- Send timely reminders and notifications for medicine intake.
- Allow users to add, edit, and delete medication reminders.
- Provide a user-friendly interface for easy interaction.
- Store and manage user data securely.

## Functional Requirements
1. **User Registration and Login**
   - Users can create accounts and log in securely.
2. **Add Medication Reminder**
   - Users can add new reminders with medicine name, dosage, time, and frequency.
3. **Edit/Delete Reminder**
   - Users can update or remove existing reminders.
4. **View Reminders**
   - Users can see a list of all their medication reminders.
5. **Notification System**
   - The system sends notifications (email, SMS, or app alerts) at scheduled times.
6. **User Profile Management**
   - Users can update their personal information and preferences.
7. **Admin Module**
   - Admins can manage users and monitor system activity.

## Non-Functional Requirements
- **Usability:** The system should be easy to use and accessible to all age groups.
- **Reliability:** Reminders and notifications must be sent accurately and on time.
- **Performance:** The system should respond quickly to user actions.
- **Security:** User data must be protected and only accessible by authorized users.
- **Scalability:** The system should handle increasing numbers of users and reminders.
- **Maintainability:** The codebase should be easy to update and maintain.

## Modules
1. **Authentication Module**
   - Handles user registration, login, and authentication.
2. **Reminder Management Module**
   - Allows users to add, edit, delete, and view reminders.
3. **Notification Module**
   - Sends reminders to users via email, SMS, or app notifications.
4. **User Profile Module**
   - Manages user information and settings.
5. **Admin Module**
   - Provides admin functionalities for user and system management.
6. **Frontend Module**
   - User interface for interacting with the system.
7. **Backend Module**
   - Handles business logic, database operations, and API endpoints.

## Technologies Used
- **MongoDB:** Database for storing user and reminder data.
- **Express.js:** Backend framework for building APIs.
- **React.js:** Frontend library for building user interfaces.
- **Node.js:** Runtime environment for backend development.
- **Vite:** Tool for fast frontend development and bundling.
- **JWT:** For secure authentication and authorization.
- **Nodemailer/Twilio:** For sending email/SMS notifications.

---
This documentation provides a clear overview of the Medical Reminder System, its purpose, features, and the technologies used. The language is simple and easy to understand for all stakeholders.