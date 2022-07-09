//calcularea si afisarea pretului in functie de numarul de zile selectate
document.getElementById("selectData").addEventListener("click", function () {
    colecteazaData();
  });
  function colecteazaData() {
    let butonData = document.getElementById("selectData");
    let primaData = document.getElementById("dateStart");
    let ultimaData = document.getElementById("dateEnd");
    if (primaData.value != "" && ultimaData.value != "") {
      function daysDiff() {
        var pret = document.getElementById("pretmasina").innerHTML.split("€/zi");
        console.log(pret);
        let date1 = new Date(primaData.value);
        let date2 = new Date(ultimaData.value);
        let difference = date2.getTime() - date1.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
        return (document.getElementById("pret-final").textContent =
          TotalDays * parseInt(pret[0]) + " €");
      }
      console.log(daysDiff());
    }
  }
  document.getElementById("dateEnd").onchange = function () {
    colecteazaData();
  }

  // verificarea datelor introduse pentru card si afisarea modalitatii de plata
  document.getElementById("payment").style.display = "none";

  const form = document.getElementById("payment");
  
  function handleRadioClick() {
    if (document.getElementById("card").checked) {
      form.style.display = 'block';
    } else {
      form.style.display = 'none';
    }
  }
  
  const radioButtons = document.querySelectorAll('input[name="pay-radio"]');
  radioButtons.forEach(radio => {
    radio.addEventListener('click', handleRadioClick);
  });
  
  function formats(ele,e){
      if(ele.value.length<19){
        ele.value= ele.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
        return true;
      }else{
        return false;
      }
    }
    
    function numberValidation(e){
      e.target.value = e.target.value.replace(/[^\d ]/g,'');
      return false;
    }

    // preia forma si returneaza numarul daca e valid
  function valid_credit_card(value) {
  // accept only digits, dashes or spaces
      if (/[^0-9-\s]+/.test(value)) return false;
  
  // Luhn Alogoritm
      var nCheck = 0, nDigit = 0, bEven = false;
      value = value.replace(/\D/g, "");
  
      for (var n = value.length - 1; n >= 0; n--) {
          var cDigit = value.charAt(n),
              nDigit = parseInt(cDigit, 10);
  
          if (bEven) {
              if ((nDigit *= 2) > 9) nDigit -= 9;
          }
  
          nCheck += nDigit;
          bEven = !bEven;
      }
  
      return (nCheck % 10) == 0;
  }


// document.getElementById("selectData").addEventListener("click", function () {
//   sendEmail();
//     }); 
//     function sendEmail() {
//       //trimiterea informatiilor via Email
//       Email.send({
//           Host : "smtp.firebase.com",
//           Username : "rentacaremails@gmail.com",
//           Password : "8B54412BB19C2C39DCD72C16302D130EAA65",
//           To : 'rentacaremails@gmail.com',
//           From : "rentacaremails@gmail.com",
//           Subject : "Ai primit un Email de la rentacar.ro",
//           Body : "Ai primit un Email de la rentacar.ro",
//         }).then(
//         message => alert(message)
//         );
//   }  

