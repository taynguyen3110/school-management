# School Management Dashboard

This project is a comprehensive School Management Dashboard built with Angular. It provides an intuitive interface for managing various aspects of a school, including students, teachers, parents, classes, and more. The dashboard includes various charts and statistics to help visualize data effectively.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Components](#components)
- [Services](#services)
- [Routes](#routes)
- [Contributions](#contributions)
- [License](#license)

## Features

- Token-based authentication with interceptor.
- Admin Dashboard with various statistics.
- Charts for visualizing data.
- Navigation between different sections (students, teachers, parents, classes, etc.)
- CRUD operations on entities.
- Form integrated with Google Place API.
- Form change detection, stop navigation away when there are unsaved changes.
- Material components (date picker, dialog, etc.).
- Lazyloading.
- Global search.

## Installation

1. Initialize and start the backend project:
   ```sh
   https://github.com/taynguyen3110/school-mgmt-api
   ```
2. Clone the school-management repository:
   ```sh
   git clone https://github.com/taynguyen3110/school-management.git
   ```
3. Navigate to the project directory:
   ```sh
   cd school-management
   ```
4. Install the dependencies:
   ```sh
   npm install
   ```
5. Start the development server:
   ```sh
   ng serve -o
   ```

Mock login information:
username: u1@example.com
password: password01

## Project Structure

## Components

![alt text](screenshots/v2.0/image-2.png)

**Dashboard Components**

DashboardComponent: Main component for the dashboard overview.

GenderRatioComponent: Displays the gender ratio chart.

EnrollmentStatsComponent: Displays enrollment statistics.

StatsWrapperComponent: Container for multiple statistics components.

StatsCellComponent: Individual statistic display component.

NoticeNewsComponent: Shows announcements and news updates.

![alt text](screenshots/v2.0/image-3.png)

**Other Components**

StudentsComponent: Manages student-related data and actions.

TeachersComponent: Manages teacher-related data and actions.

ParentsComponent: Manages parent-related data and actions.

ClassesComponent: Manages class-related data and actions.

![alt text](screenshots/v2.0/image-1.png)

**Services**

NavigationService: Handles navigation between different routes.

DashboardService: Fetches statistical data for the dashboard.

AuthService: Manages authentication and user sessions.

NotificationService: Handles user notifications and alerts.

## Routes

All routes for the application are defined in src/app/app.routes.ts. Below are some of the main routes:

    / - Dashboard

    /students - Students

    /students/:id - Student Profile

    /teachers - Teachers

    /teachers/:id - Teacher Profile

    /parents - Parents

    /parents/:id - Parent Profile

    /subjects - Subjects

    /subjects/:id - Subject Detail

    /classes - Classes

    /classes/:id - Class Detail

    /user - User Profile

## Contributions

Key Contributions

![alt text](screenshots/v2.0/image-0.png)

**Dashboard Development**

Implemented the main dashboard layout and components, including DashboardComponent, StatsWrapperComponent, and StatsCellComponent.

Created dynamic charts for the gender ratio and enrollment statistics using GenderRatioComponent and EnrollmentStatsComponent.

![alt text](screenshots/v2.0/image-6.png)

**Form Handling**

Built reusable form components like InputComponent and AddNewFormLayoutComponent.

Added form validation and submission logic in components such as AddStudentComponent and AddTeacherComponent.

Implement Google Places API

![alt text](screenshots/v2.0/image-8.png)

**Profile Management**

Developed profile components for students, teachers, and parents, including StudentProfileComponent, TeacherProfileComponent, and ParentProfileComponent.

Enabled profile photo and info display with ProfilePhotoComponent and ProfileInfoComponent.

![alt text](screenshots/v2.0/image-4.png)

**Authentication**

Implemented authentication using AuthService and AuthApiService.

Interceptor

Created a secure login page with validation and error handling.

![alt text](screenshots/v2.0/image-5.png)

**Notification**

**Technical Skills Demonstrated**

Angular: Built a complex Angular application with reusable components, services, and modules.

TypeScript: Used TypeScript for type safety and maintainability.

Reactive Forms: Implemented reactive forms with dynamic controls and validation.

![alt text](screenshots/v2.0/image-7.png)

Reusability:

State Management: Utilized Angular services and RxJS for efficient state management.

API Integration: Integrated RESTful APIs for data operations and updates.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
