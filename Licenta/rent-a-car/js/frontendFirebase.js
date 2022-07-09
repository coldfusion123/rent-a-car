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
let v = [];
let i = 0;

//parcurgerea datelor din Firebase si afisarea lor dinamica prin crearea de box-uri in carusel
get(child(dbRef, "cars/")).then((snapshot) => {
  snapshot.forEach((child) => {
    // v is an array who get all child.key
    v[i] = child.key;
    i++;
  });

  const sw = document.getElementById("sw");

  for (i = 0; i <= v.length - 1; i++) {
    var imgUrl;
    var model;
    var price;
    const id = v[i];
    var href = `/rent-a-car/rentpage/rentpage.html`;

    get(child(dbRef, "cars/" + v[i])).then((snapshot) => {
      snapshot.forEach((child) => {
        switch (child.key) {
          case "imgUrl": {
            imgUrl = child.val();
            break;
          }
          case "model": {
            model = child.val();
            break;
          }
          case "price": {
            price = child.val() + "€/zi";
            break;
          }
          default:
            console.log(`Sorry, we are out of ${expr}.`);
        }
      });

      var el = document.createElement("div");
      el.classList.add("swiper-slide", "box");

      var contentDiv = document.createElement("div");
      contentDiv.classList.add("content");

      var anchor = document.createElement("a");
      anchor.href = href + "?id=" + id;
      anchor.classList.add("btn");
      anchor.textContent = "Rezerva acum";

      var img = document.createElement("img");
      img.id = "masinacarusel";
      img.src = imgUrl;
      img.alt = "";

      var h3 = document.createElement("h3");
      h3.textContent = model;
      contentDiv.appendChild(h3);

      var priceDiv = document.createElement("div");
      priceDiv.classList.add("price");
      priceDiv.textContent = price;
      contentDiv.appendChild(priceDiv);

      contentDiv.appendChild(anchor);

      el.appendChild(img);
      el.appendChild(contentDiv);

      sw.appendChild(el);
    });
  }
});

