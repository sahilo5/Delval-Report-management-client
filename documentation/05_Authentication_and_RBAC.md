# Authentication and RBAC

The application implements a secure authentication flow and Role-Based Access Control (RBAC).

## Authentication Flow

### Login (`src/components/Login.tsx`)
- **Endpoint**: `POST /api/auth/login`
- **Process**:
    1. User submits credentials (username, password).
    2. Server returns JWT (`accessToken`), username, and `userRole`.
    3. Application stores these details in `localStorage`.
- **Redirect**: Upon success, users are directed to their role-specific dashboard (Future Implementation).

### Registration (`src/components/Register.tsx`)
- **Endpoint**: `POST /api/auth/register`
- **Fields**: Username, Email, Password, Phone Number, First Name, Last Name.
- **Validation**: Frontend validation ensures required fields and correct formats (email, phone).

## Role-Based Access Control (RBAC)

The `userRole` stored in local storage is used to determine access permissions.

### Supported Roles
- **Assembly Engineer**
- **Assembler**
- **Tester**
- **QA**

### Implementation Strategy
- **Protected Routes**: Use a wrapper component (e.g., `<ProtectedRoute />`) to check `localStorage` for a valid token and authorized role before rendering private pages.
- **Conditional Rendering**: UI elements can be shown/hidden based on the current user's role.
