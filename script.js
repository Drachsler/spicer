import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

console.log("A");

document.addEventListener('DOMContentLoaded', async () => {
  const input = document.getElementById('user-pin');
  const button = document.getElementById('submitBtn');
  const errorBox = document.getElementById('errorMessage');

  
  const params = new URLSearchParams(window.location.search);
  const spiceId = params.get('id');

  if (!spiceId) {
    showError("No spice found");
    return;
  }

  if (spiceId) {
    const docRef = doc(db, "spices", spiceId);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("🔥 Firestore-Daten:", data);
        document.body.insertAdjacentHTML('beforeend', `<pre>${JSON.stringify(data, null, 2)}</pre>`);
        
        button.addEventListener('click', async () => {
          const enteredPin = input.value.trim();
          if (!enteredPin) {
            showError("Bitte einen PIN eingeben",false);
            return;
          }
          // Greife auf Dokument mit ID = PIN zu
          const userDocRef = doc(db, "spices", spiceId, "user", enteredPin);

          try {
            const userSnap = await getDoc(userDocRef);

            if (userSnap.exists()) {
              const userData = userSnap.data();
              console.log("✅ Benutzer gefunden:", userData);
              // Weiterleitung oder Anzeige hier
              alert(`Willkommen, ${userData.name}`);
              // Beispiel: Weiterleitung mit user-id
              // window.location.href = `details.html?id=${spiceId}&user=${enteredPin}`;
            } else {
              console.warn("❌ Kein Benutzer mit diesem PIN gefunden");
              showError("No user found",true);
            }
          } catch (error) {
            console.error("🔥 Fehler beim Abruf:", error);
            showError("This does not compute",true);
          }
        });
      } else {
        console.warn("❌ No spice found");
        showError("No spice found",true);
      }
    } catch (error) {
      console.error("🔥 Fehler beim Abruf:", error);
      showError("This does not compute",true);
    }
  }

  
function showError(message, disabled) {
    input.disabled = disabled;
    button.disabled = disabled;
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
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
