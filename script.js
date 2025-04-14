import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// 🔥 Hier deine eigene Firebase-Konfiguration einfügen
const firebaseConfig = {
  apiKey: "AIzaSyAOiHCgQbf9SZWp3twFuXNwa5qrIDDZhis",
  authDomain: "spicer-f7df5.firebaseapp.com",
  projectId: "spicer-f7df5",
  storageBucket: "spicer-f7df5.firebasestorage.app",
  messagingSenderId: "745558921292",
  appId: "1:745558921292:web:f741a662ad2c1f9fbf64e9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("saveBtn").addEventListener("click", async () => {
  await setDoc(doc(db, "users", "user1"), {
    name: "Stefan Test",
    email: "max@example.com"
  });
  alert("Daten gespeichert:1");
});
