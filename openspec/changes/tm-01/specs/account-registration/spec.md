## ADDED Requirements

### Requirement: Registration page
The system SHALL provide a public registration page at `/register` with the product name, a "Create your account" heading, and a link to `/login`.

#### Scenario: Visitor opens registration
- **WHEN** an unauthenticated visitor navigates to `/register`
- **THEN** the system displays the registration form and a link to `/login`

### Requirement: Accessible registration inputs
The system SHALL provide associated labels for name, email, password, and password-confirmation inputs; visible focus indicators; password rules beneath the password input; and error announcements that do not require a mouse.

#### Scenario: Keyboard user reaches an invalid field
- **WHEN** a keyboard user submits the form with invalid input
- **THEN** the system exposes the relevant error through the associated field and assistive technology announcement

#### Scenario: Small-screen visitor views registration
- **WHEN** the registration page is displayed on a small screen
- **THEN** the form card uses the available width and controls retain comfortable touch targets, labels, and visible focus states

### Requirement: Client-side registration validation
The system SHALL prevent submission until the trimmed name is 2 to 100 characters, the trimmed lowercase email is valid and no more than 254 characters, the password is 8 to 128 characters and contains uppercase, lowercase, and numeric characters, and the password confirmation matches.

#### Scenario: Invalid registration data
- **WHEN** a visitor enters invalid registration data or mismatched passwords
- **THEN** the system displays concise inline validation and does not send a registration request

#### Scenario: Valid registration data
- **WHEN** a visitor provides data that satisfies all registration rules
- **THEN** the system permits form submission

### Requirement: Registration submission and authentication
The system SHALL submit valid registration data to `POST /api/auth/register` with name, email, and password and SHALL include credentials in the request. While the request is pending, the system SHALL disable the submit button.

#### Scenario: Successful registration
- **WHEN** the registration API responds successfully with an access token
- **THEN** the system stores only that access token in memory and navigates the visitor to `/`

### Requirement: Safe registration failure handling
The system SHALL keep the form editable after a failed registration request, display duplicate-email errors beside the email field, and SHALL NOT expose submitted password values in error output.

#### Scenario: Duplicate email
- **WHEN** the registration API responds with a duplicate-email conflict
- **THEN** the system displays an understandable error associated with the email field and preserves the visitor's editable form state

#### Scenario: Other registration failure
- **WHEN** the registration API responds with a non-duplicate failure
- **THEN** the system displays an understandable safe form error and re-enables submission
