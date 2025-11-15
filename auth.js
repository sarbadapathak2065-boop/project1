import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { app } from "./firebaseconfig.js"; // 👈 make sure lowercase f
import { saveUserData, getUserData } from "./firestore.js";

const auth = getAuth(app);

// ===== Sign Up =====
export async function signUp(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await saveUserData(user.uid, name, email);
    alert("Signup successful!");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("This email is already registered. Please log in instead.");
    } else {
      alert(error.message);
    }
  }
}

// ===== Log In =====
export async function logIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
  } catch (error) {
    alert(error.message);
  }
}

// ===== Log Out =====
export async function logOut() {
  try {
    await signOut(auth);
    alert("Logged out!");
  } catch (error) {
    alert(error.message);
  }
}

// ===== Track user and display dashboard =====
export function trackUser() {
  onAuthStateChanged(auth, async (user) => {
    const dashboard = document.getElementById("dashboard");
    const loginForm = document.getElementById("loginSection");
    const signupForm = document.getElementById("signupSection");
    const welcomeMsg = document.getElementById("welcomeMsg");

    if (user) {
      // Hide login/signup
      loginForm.style.display = "none";
      signupForm.style.display = "none";
      dashboard.style.display = "block";

      // Fetch user's name from Firestore
      const userData = await getUserData(user.uid);
      const name = userData?.name || "User";
      welcomeMsg.textContent = `Welcome, ${name}!`;
    } else {
      // Show login/signup
      loginForm.style.display = "block";
      signupForm.style.display = "block";
      dashboard.style.display = "none";
    }
  });
}
