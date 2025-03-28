
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Toaster } from "@/components/ui/toaster";

// Declare the global interface to allow adding goToAdmin to window
declare global {
  interface Window {
    goToAdmin: () => void;
  }
}

// Add a global function to navigate to admin
window.goToAdmin = () => {
  window.location.href = '/admin/bookings';
};

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
