import { getFirestore, doc, setDoc, getDoc } 
  from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";
import { app } from "./firebaseconfig.js";

const db = getFirestore(app);

// 🔹 Save user info to Firestore
export async function saveUserData(uid, name, email) {
  try {
    await setDoc(doc(db, "users", uid), {
      name: name,
      email: email,
      createdAt: new Date()
    });
    console.log("User data saved!");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

// 🔹 Get user info from Firestore
export async function getUserData(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No user data found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
