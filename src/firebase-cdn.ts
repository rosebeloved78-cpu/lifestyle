// Firebase CDN imports - no npm needed
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyB7mAxhfjuIphcep2g9OoTqW7UyQ4C7PDg",
  authDomain: "lifestyle-fb7b8.firebaseapp.com",
  projectId: "lifestyle-fb7b8",
  storageBucket: "lifestyle-fb7b8.firebasestorage.app",
  messagingSenderId: "731261323239",
  appId: "1:731261323239:web:8871da773b91b2a37c9f42"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export { createUserWithEmailAndPassword, sendEmailVerification }
