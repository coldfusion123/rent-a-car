// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuk0IJykBFvCcoW0KSyGKL9Q12sPi116c",
  authDomain: "licenta-53325.firebaseapp.com",
  databaseURL:
    "https://licenta-53325-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "licenta-53325",
  storageBucket: "licenta-53325.appspot.com",
  messagingSenderId: "302101087886",
  appId: "1:302101087886:web:d9cc251618c00b58a6ebdf",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const dbRef = ref(getDatabase());

//scrierea in Firebase a datelor din formular
document.getElementById("selectData").addEventListener("click", function () {
  numeClient();
});
function numeClient() {
  let buttonAlert = document.getElementById("selectData");

  let cardHolderName = document.getElementById("numeComplet");
  let cardHolderEmail = document.getElementById("emailClient");
  let cardHolderPhone = document.getElementById("telefonClient");
  let model = document.getElementById("numemasina");
  let pretZi = document.getElementById("pretmasina");
  let pretTotal = document.getElementById("pret-final");
  let numarCard = document.getElementById("numarCard");
  let cash = document.getElementById("cash");
  let card = document.getElementById("card");
  if (
    cardHolderName.value != "" &&
    cardHolderEmail.value != "" &&
    cardHolderPhone.value != "" 
  ) {
    set(ref(database, "clienti/" + cardHolderName.value), {
      email: cardHolderEmail.value,
      telefon: cardHolderPhone.value,
      model : model.textContent,
      pretZi : pretZi.textContent,
      pretTotal : pretTotal.textContent,
      numarCard : numarCard.value,
      metodataPlata : cash.checked ? "cash" : "card"
    });
    buttonAlert.onclick(
      Swal.fire(
        "Felicitari!",
        "Comanda ta a fost inregristrata cu succes.",
        "success"
      )
    );
  } else {
    buttonAlert.onclick(
      Swal.fire(
        "Ne pare rau!",
        "Comanda ta nu a fost inregistrata. Te rugam sa completezi toate campurile.",
        "error"
      )
    );
  }
}

//citirea si afisarea datelor din Firebase in functie de id-ul din URL
function getId(urlId) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(urlId);
}
let id = getId("id");

get(child(dbRef, "cars/" + id)).then((snapshot) => {
  snapshot.forEach((child) => {
    switch (child.key) {
      case "model": {
        let model = child.val();
        document.getElementById("numemasina").textContent = model;
        break;
      }
      case "price": {
        let price = child.val();
        document.getElementById("pretmasina").innerHTML = price + " €/zi";
        break;
      }
      case "imgUrl": {
        let imgUrl = child.val();
        console.log(imgUrl);
        document.getElementById("imgmasina");
        imgmasina.src = imgUrl;
        imgmasina.alt = "Imaginea masinii";
        break;
      }
    }
  });
});

