console.log("F");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
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
  const input = document.getElementById('user-pin');
  const button = document.getElementById('submitBtn');
  const errorBox = document.getElementById('errorMessage');
  
  const params = new URLSearchParams(window.location.search);
  const spiceId = params.get('id');

  if (!spiceId) {
    showError("No spice found", true);
    return;
  }

  if (spiceId) {
    const docRef = doc(db, "spices", spiceId);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        document.body.insertAdjacentHTML('beforeend', `<pre>${JSON.stringify(data, null, 2)}</pre>`);

        input.addEventListener('input', () => {
          errorBox.classList.add('hidden');
          errorBox.classList.remove('shake');
          input.disabled = false;
          button.disabled = false;
        });
        
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
              console.log("✅ Benutzer gefunden:", userData.lastOnline);
              const sessionUser = {
                spiceId: spiceId,
                userId: userDocRef.id,
                name: userData.name,
                status: userData.status,
                lastOnline: userData.lastOnline
              };
              sessionStorage.setItem("sessionUser", JSON.stringify(sessionUser));
              window.location.href = "details.html";
            } else {
              console.warn("❌ Kein Benutzer mit diesem PIN gefunden");
              showError("No user found",false);
            }
          } catch (error) {
            console.error("🔥 Fehler beim Abruf:", error);
            showError("This does not compute1",true);
          }
        });
      } else {
        console.warn("❌ No spice found");
        showError("No spice found",true);
      }
    } catch (error) {
      console.error("🔥 Fehler beim Abruf:", error);
      showError("This does not compute2",true);
    }
  }

  
function showError(message, disabled) {
    input.disabled = disabled;
    button.disabled = disabled;
    errorBox.textContent = message;
    errorBox.classList.remove("hidden");
  
    // Shake-Klasse hinzufügen und nach Animation wieder entfernen
    errorBox.classList.add("shake");
    setTimeout(() => {
      errorBox.classList.remove("shake");
    }, 400); // muss zur Animationsdauer passen
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
