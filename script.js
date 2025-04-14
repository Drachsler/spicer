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


document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const spiceId = params.get('id');

  if (spiceId) {
    const docRef = doc(db, "spices", spiceId);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("🔥 Firestore-Daten:", data);
        document.body.insertAdjacentHTML('beforeend', `<pre>${JSON.stringify(data, null, 2)}</pre>`);
      } else {
        console.warn("❌ Kein Dokument mit dieser ID gefunden.");
      }
    } catch (error) {
      console.error("🔥 Fehler beim Abruf:", error);
    }
  }
});


/*

const params = new URLSearchParams(window.location.search);
const spiceId = params.get('id');

document.getElementById("saveBtn").addEventListener("click", async () => {
  await setDoc(doc(db, "users", "user1"), {
    name: "Stefan Test",
    email: "max@example.com"
  });
  alert("Daten gespeichert: 1");
});
*/
