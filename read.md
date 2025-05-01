# Authentication API



---

## 📋 Endpoints

### 1. Signup  
**POST** `/signup`

- **URL**: `http://localhost:9000/api/auth/signup`
- **Description**: Register a new user.
- **Request Body**:  
- **Response**:  

---

### 2. Login  
**POST** `/login`

- **URL**: `http://localhost:9000/api/auth/login`
- **Description**: Authenticate the user and return a token.
- **Request Body**:  
- **Response**:  

---

### 3. Forgot Password  
**POST** `/forgotpassword`

- **URL**: `http://localhost:9000/api/auth/forgotpassword`
- **Description**: Send password reset instructions to user's email.
- **Request Body**:  
- **Response**:  

---

### 4. Reset Password  
**POST** `/resetpassword`

- **URL**: `http://localhost:9000/api/auth/resetpassword`
- **Description**: Reset the user's password using a token or code.
- **Request Body**:  
- **Response**:  

---

## 🚨 Error Format

```json
{
  "error": "Error message"
}

