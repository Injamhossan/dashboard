# React Dashboard Project

A modern, fully responsive, and feature-rich Dashboard Web Application built with React, Vite, Tailwind CSS, and Firebase Authentication.

## 🚀 Features

- **Modern UI/UX:** Clean, beautiful interface with smooth animations and dynamic data visualization.
- **Protected Routes:** Complete user authentication system guarding the dashboard.
- **Firebase Authentication:** Secure Sign Up and Login pages.
- **Mock API Login:** Simulate backend endpoint interaction with manual mock tokens.
- **Responsive Design:** Built primarily with Tailwind CSS, adapted for various screen sizes.
- **State Management:** Utilizes React's native context API and hooks.

## 🧪 Testing Credentials

To test the application without creating a new account, you can use the following default/test login info (especially useful for the Bonus Task API login endpoint):

- **Email:** `user1@example.com`
- **Password:** `password123`

*(Alternatively, you can create a completely new account by going to the Sign Up page. The newly created account will immediately allow you to access the dashboard and will display your real name!)*

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite
- **Styling:** Tailwind CSS, Framer Motion, DaisyUI
- **Icons:** Lucide React, React Icons
- **Routing:** React Router DOM (v7)
- **Authentication:** Firebase Auth
- **Notifications:** React Toastify, React Hot Toast

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Firebase configurations:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   VITE_API_URL=http://localhost:5000
   ```
   *(Note: The project already comes with a test `.env` file that contains Firebase configs for demonstration purposes)*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

## 📁 Project Structure

- `/src/components`: Reusable UI elements (Header, Sidebar, Charts, Cards).
- `/src/pages`: Main application views (Home/Dashboard, Login, SignUp).
- `/src/providers`: React Context providers (AuthProvider).
- `/src/routes`: Routing configuration and Protected/Private route wrappers.
- `/src/firebase`: Firebase SDK initialization.

## 🤝 Contribution

Feel free to open issues or submit pull requests if you want to contribute to this project.
