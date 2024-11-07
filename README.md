# School Management Dashboard

This project is a comprehensive School Management Dashboard built with Angular. It provides an intuitive interface for managing various aspects of a school, including students, teachers, parents, classes, and more. The dashboard includes various charts and statistics to help visualize data effectively.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Services](#services)
- [Routes](#routes)
- [Contributions](#contributions)
- [License](#license)

## Features

- Admin Dashboard with various statistics
- Charts for visualizing data
- Navigation between different sections (students, teachers, parents, classes, etc.)
- Notice board for announcements
- Responsive design

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/school-management-dashboard.git
2. Navigate to the project directory:
cd school-management-dashboard
3. Install the dependencies:
npm install

## Usage

Start the development server:
ng serve -o

## Project Structure

.angular/ cache/ 18.2.4/ .editorconfig .gitignore .vscode/ extensions.json launch.json tasks.json angular.json package.json public/ assets/ images/ test.js README.md src/ app/ app.component.html app.component.scss app.component.spec.ts app.component.ts app.config.ts app.routes.ts auth/ dashboard/ dashboard-page.component.html dashboard-page.component.ts gender-ratio/ gender-ratio.component.html gender-ratio.component.ts enrollment-stats/ enrollment-stats.component.html enrollment-stats.component.ts notice-news/ notice-news.component.html notice-news.component.ts parents/ parent-add/ parent-add.component.html parent-add.component.ts parent-profile/ parent-profile.component.html parent-profile.component.ts parents-page.component.html parents-page.component.ts school-classes/ classes-add/ classes-add.component.html classes-add.component.ts classes-detail/ classes-detail.component.html classes-detail.component.ts classes-page.component.html classes-page.component.ts shared/ components/ addnew-form-layout/ addnew-form-layout.component.html addnew-form-layout.component.ts filter/ filter.component.ts header/ header.component.html header.component.ts input/ input.component.ts item-table/ item-table.component.html item-table.component.ts loading-spinner/ loading-spinner.component.ts main-layout/ main-layout.component.html main-layout.component.ts multiselector/ multiselector.component.ts page-layout/ page-layout.component.html page-layout.component.ts pagination/ pagination.component.ts photouploader/ photo-uploader.component.ts profile-info/ profile-info.component.html profile-info.component.ts profile-layout/ profile-layout.component.html profile-layout.component.ts profile-photo/ profile-photo.component.ts sidebar/ sidebar.component.html sidebar.component.ts accordion-button/ accordion-button.component.ts accordion-item/ accordion-item.component.ts services/ auth.service.ts authApi.service.ts classes.service.ts dashboard.service.ts form.service.ts navigation.service.ts notification.service.ts parents.service.ts student.service.ts subject.service.ts teacher.service.ts types.ts students/ student-add/ student-add.component.html student-add.component.ts student-profile/ student-profile.component.html student-profile.component.ts student-page/ students-page.component.html students-page.component.ts subjects/ subject-add/ subject-add.component.html subject-add.component.ts subject-detail/ subject-detail.component.html subject-detail.component.ts subject-page.component.html subject-page.component.ts teachers/ teacher-add/ teacher-add.component.html teacher-add.component.ts teacher-profile/ teacher-profile.component.ts teachers-page.component.html teachers-page.component.ts index.html main.ts styles.scss tailwind.config.js tsconfig.app.json tsconfig.json tsconfig.spec.json

## Components

Dashboard Components
    DashboardComponent: Main component for the dashboard overview.
    GenderRatioComponent: Displays the gender ratio chart.
    EnrollmentStatsComponent: Displays enrollment statistics.
    StatsWrapperComponent: Container for multiple statistics components.
    StatsCellComponent: Individual statistic display component.
    NoticeNewsComponent: Shows announcements and news updates.
    ![alt text](image.png)

Other Components
    StudentsComponent: Manages student-related data and actions.
    TeachersComponent: Manages teacher-related data and actions.
    ParentsComponent: Manages parent-related data and actions.
    ClassesComponent: Manages class-related data and actions.
    ![alt text](image-1.png)

Services
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

Dashboard Development
    Implemented the main dashboard layout and components, including DashboardComponent, StatsWrapperComponent, and StatsCellComponent.
    Created dynamic charts for the gender ratio and enrollment statistics using GenderRatioComponent and EnrollmentStatsComponent.

Form Handling
    Built reusable form components like InputComponent and AddNewFormLayoutComponent.
    Added form validation and submission logic in components such as AddStudentComponent and AddTeacherComponent.

Profile Management
    Developed profile components for students, teachers, and parents, including StudentProfileComponent, TeacherProfileComponent, and ParentProfileComponent.
    Enabled profile photo and info display with ProfilePhotoComponent and ProfileInfoComponent.

Authentication
    Implemented authentication using AuthService and AuthApiService.
    Created a secure login page with validation and error handling.

Technical Skills Demonstrated
    Angular: Built a complex Angular application with reusable components, services, and modules.
    TypeScript: Used TypeScript for type safety and maintainability.
    Reactive Forms: Implemented reactive forms with dynamic controls and validation.
    State Management: Utilized Angular services and RxJS for efficient state management.
    API Integration: Integrated RESTful APIs for data operations and updates.