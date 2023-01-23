const form = document.getElementById("form");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const telephone = document.getElementById("telephone");
const groupe = document.getElementById("groupe");
const email = document.getElementById("email");
const bio = document.getElementById("bio");
const image = document.createElement("img");
const btnCreer = document.querySelector(".btn-creer");
btnCreer.textContent = "Créer";
const btnReset = document.getElementById("btn-reset");
btnReset.textContent = "Rénit";
let tabData = [];
// localStorage.clear();
let file;
let fileUrl;
let fileExist = 0;
let imgTag;
const dropArea = document.getElementById("container-drap");
const btnFile = document.querySelector(".choice-file");
let inputFile = document.querySelector(".inputFile");

/*
  VERIFIER SI LE NOM EST VALIDE
*/
let validNom = false;
nom.addEventListener("blur", () => {
  const errNom = document.querySelector(".nom-no-valide");
  const valueNom = nom.value;
  if (valueNom.length < 3) {
    validNom = false;
    errNom.classList.remove("remove");
    nom.classList.add("errorInput");
    errNom.innerHTML = "Le nom doit contenier au-mois 3 caractères!";
  } else {
    validNom = true;
    errNom.classList.add("remove");
    nom.classList.remove("errorInput");
    if (valueNom.length > 50) {
      validNom = false;
      errNom.classList.remove("remove");
      nom.classList.add("errorInput");
      errNom.innerHTML = "Le nom doit contenier max 50 caractères!";
    } else {
      validNom = true;
      errNom.classList.add("remove");
      nom.classList.remove("errorInput");
    }
  }
});
/*
  VERIFIER SI LE PRENOM EST VALIDE
*/
let validPrenom = false;
prenom.addEventListener("blur", () => {
  const errPrenom = document.querySelector(".prenom-no-valide");
  const valuePrenom = prenom.value;
  if (valuePrenom.length < 3) {
    validPrenom = false;
    errPrenom.classList.remove("remove");
    prenom.classList.add("errorInput");
    errPrenom.innerHTML = "Le prenom doit contenier au-mois 3 caractères!";
  } else {
    validPrenom = true;
    errPrenom.classList.add("remove");
    prenom.classList.remove("errorInput");
    if (valuePrenom.length > 50) {
      validPrenom = false;
      errPrenom.classList.remove("remove");
      prenom.classList.add("errorInput");
      errPrenom.innerHTML = "Le prenom doit contenier max 50 caractères!";
    } else {
      validPrenom = true;
      errPrenom.classList.add("remove");
      prenom.classList.remove("errorInput");
    }
  }
});

/*
  VERIFIER SI LE MAIL EST VALIDE
*/
let validMail = false;
email.addEventListener("blur", function () {
  const erreurMAil = document.querySelector(".mail-no-valide");
  const emailRegex = /^[a-zA-Z0-9._%+-][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email.value)) {
    erreurMAil.classList.remove("remove");
    erreurMAil.innerHTML = "Cette email est non valide";
    email.classList.add("errorInput");
  } else {
    erreurMAil.classList.add("remove");
    email.classList.remove("errorInput");
    validMail = true;
  }
});
/*
  VERIFIER SI LE TEL EST VALIDE
*/
let validTel = false;
telephone.addEventListener("blur", function () {
  const erreurTel = document.querySelector(".tel-no-valide");
  const telRegex = /^\d{10,}$/;
  if (telRegex.test(telephone.value)) {
    erreurTel.classList.add("remove");
    telephone.classList.remove("errorInput");

    let opeRegex = /^(084|085|080|089|081|082|099|097|090)\d+$/;
    if (opeRegex.test(telephone.value)) {
      const telNumb = telephone.value;
      if (telNumb.length === 10) {
        validTel = true;
      } else {
        validTel = false;
        erreurTel.innerHTML = "Le numero doit contenir que 10 chiffres";
        erreurTel.classList.remove("remove");
        telephone.classList.add("errorInput");
      }
    } else {
      validTel = false;
      erreurTel.innerHTML = "Renseigner le format d'un opérateur valide";
      erreurTel.classList.remove("remove");
      telephone.classList.add("errorInput");
    }
  } else {
    validTel = false;
    erreurTel.innerHTML = "Le Tel doit contenir 10 chiffres";
    erreurTel.classList.remove("remove");
    telephone.classList.add("errorInput");
  }
});
/*
    RECUPERER L IMAGE PAR L INPUT TYPE FILE
*/
btnFile.onclick = () => {
  inputFile.click();
};
inputFile.addEventListener("change", () => {
  file = inputFile.files[0];
  fileExist = inputFile.files.length;
  displayFile(dropArea);
});

/*
    GLISSER DEPOSER
*/
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropArea.classList.add("container-drap-event");
});
dropArea.addEventListener("dragleave", (event) => {
  dropArea.classList.remove("container-drap-event");
});
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();
  //recuperer l image
  file = event.dataTransfer.files[0];
  fileExist = event.dataTransfer.files.length;
  displayFile(dropArea);
});

/*
  LES ACTIONS SUR LES IMAGES
*/
function displayFile(area) {
  // autoriser seulement les images
  const errImageFormat = document.querySelector(".image-no-valide");

  let fileType = file.type;
  let valideExtention = ["image/jpeg", "image/png", "image/jpg"];

  if (valideExtention.includes(fileType)) {
    errImageFormat.classList.add("remove");
    area.classList.remove("droAreaError");

    if (file.size <= 5000000) {
      //FileReader permet de lire les données d'un fichier de manière asynchrone,
      let fileReader = new FileReader();

      fileReader.onload = () => {
        fileUrl = fileReader.result;
        image.setAttribute("src", fileUrl);
        const contenuArea = document.querySelector(".contenu");
        contenuArea.style.display = "none";
        if (area.querySelector("img")) {
          // console.log("exist");
          area.querySelector("img").remove();
        }
        area.appendChild(image);

        btnReset.addEventListener("click", () => {
          area.removeChild(image);
          contenuArea.style.display = "block";
        });
      };

      fileReader.readAsDataURL(file);
    } else {
      errImageFormat.classList.remove("remove");
      area.classList.add("droAreaError");
      errImageFormat.innerHTML = "Le fichier doit pèser max 5 Mo";
    }
  } else {
    errImageFormat.classList.remove("remove");
    area.classList.add("droAreaError");
    errImageFormat.innerHTML = "Le format de ce fichier est non valide";
  }
}

/*
  VALIDATION DU FORMULAIRE ET STOCKAGE
*/
function validation(e) {
  const nomValue = nom.value.trim();
  const prenomValue = prenom.value.trim();
  const telephoneValue = telephone.value.trim();
  const groupeValue = groupe.value.trim();
  const emailValue = email.value.trim();
  const bioValue = bio.value;
  if (
    nomValue !== "" &&
    prenomValue !== "" &&
    telephoneValue !== "" &&
    nomValue !== "" &&
    groupeValue !== "" &&
    emailValue !== "" &&
    bioValue !== "" &&
    validMail &&
    validTel &&
    validNom &&
    validPrenom
  ) {
    let id = new Uint32Array(1);
    window.crypto.getRandomValues(id);
    if (localStorage.hasOwnProperty("data-contact")) {
      tabData = JSON.parse(localStorage.getItem("data-contact"));
    }
    let emailExists = tabData.find((contact) => contact.email === emailValue);
    let telExists = tabData.find(
      (contact) => contact.telephone === telephoneValue
    );

    if (telExists) {
      e.preventDefault();
      const erreurTel = document.querySelector(".tel-no-valide");
      erreurTel.classList.remove("remove");
      erreurTel.innerHTML = "Ce numero existe déjà dans le carnet";
      telephone.classList.add("errorInput");
    }
    if (emailExists) {
      e.preventDefault();
      const erreurMAil = document.querySelector(".mail-no-valide");
      erreurMAil.classList.remove("remove");
      erreurMAil.innerHTML = "cette email existe déjàn dans le carnet";
      email.classList.add("errorInput");
    }
    if (!telExists && !emailExists) {
      tabData.push({
        id: id[0],
        prenom: prenomValue,
        nom: nomValue,
        telephone: telephoneValue,
        groupe: groupeValue,
        email: emailValue,
        bio: bioValue,
        image: fileUrl,
      });
      // console.log(tabData);
      localStorage.setItem("data-contact", JSON.stringify(tabData));
      // return true;
    }
  } else {
    e.preventDefault();
    const error = document.querySelector(".alert-danger");
    error.innerHTML = " Remplissez tous les champs !!!";
    //Set error Message
    error.classList.toggle("remove");
    setTimeout(function () {
      error.classList.add("remove");
    }, 4000);
  }
}


/*
  AFFICHER CONTACTS
*/
let imageRecuperer;
let idUserModif;
function afficher() {
  if (localStorage.hasOwnProperty("data-contact")) {
    const data = JSON.parse(localStorage.getItem("data-contact"));
    // console.log(dataContact.length);
    // console.log(data);
    // console.log(data.length);

    for (let i = 0; i < data.length; i++) {
      const sectionResultat = document.querySelector(".section-resultat");
      const btnDelete = document.getElementById("delete-confirm");

      //je cree la premiere division du contact
      const divContenuResulat = document.createElement("div");
      divContenuResulat.classList.add("contenu-resultat");

      //
      const containerImage = document.createElement("div");
      containerImage.classList.add("container-image");

      //
      const image = document.createElement("img");
      //
      const divContainerText = document.createElement("div");
      divContainerText.classList.add("container-text");
      //
      const divContTextIdentif = document.createElement("div");
      divContTextIdentif.classList.add("container-text-identifiant");
      //
      const divNames = document.createElement("div");
      divNames.classList.add("names");
      //
      const spanPrenom = document.createElement("span");
      const spanNom = document.createElement("span");
      const spanGroupe = document.createElement("span");
      //
      const divIconSide = document.createElement("div");
      divIconSide.classList.add("icon-side");

      //
      const iconPen = document.createElement("i");
      const iconTransh = document.createElement("i");
      iconPen.classList.add("fa");
      iconPen.classList.add("fa-user-pen");

      iconTransh.classList.add("fa");
      iconTransh.classList.add("fa-trash-can");
      //
      const divTel = document.createElement("div");
      //
      const divEmail = document.createElement("div");
      //
      const divBio = document.createElement("div");
      divBio.classList.add("bio");
      // console.log(data.length);
      console.log(data[i]);

      sectionResultat.appendChild(divContenuResulat);
      divContenuResulat.appendChild(containerImage);
      divContenuResulat.appendChild(divContainerText);
      divContainerText.appendChild(divContTextIdentif);
      divContTextIdentif.appendChild(divNames);

      image.src = data[i]["image"];
      image.classList.add("img-contact");
      containerImage.appendChild(image);

      spanPrenom.textContent = data[i]["prenom"];
      spanNom.textContent = data[i]["nom"];
      spanGroupe.textContent = "- " + data[i]["groupe"];

      divNames.appendChild(spanPrenom);
      divNames.appendChild(spanNom);
      divNames.appendChild(spanGroupe);

      divContTextIdentif.appendChild(divIconSide);
      divIconSide.appendChild(iconPen);
      divIconSide.appendChild(iconTransh);

      divTel.textContent = data[i]["telephone"];
      divContainerText.appendChild(divTel);

      divEmail.textContent = data[i]["email"];
      divEmail.classList.add("email");
      divContainerText.appendChild(divEmail);

      divBio.textContent = data[i]["bio"];
      divContainerText.appendChild(divBio);

      //Modifier le contact
      iconPen.addEventListener("click", () => {
        btnCreer.textContent = "Modifier";
        btnReset.textContent = "Annuler";
        prenom.value = data[i]["prenom"];
        nom.value = data[i]["nom"];
        email.value = data[i]["email"];
        groupe.value = data[i]["groupe"];
        telephone.value = data[i]["telephone"];
        bio.value = data[i]['bio'];
        imageRecuperer = data[i]["image"];
        idUserModif = data[i]["id"]

        const contenuArea = document.querySelector(".contenu");
        contenuArea.style.display = "none";
        dropArea.innerHTML = `<img src="${imageRecuperer}"></img>`
        
      });

      //Supprimer le contact
      iconTransh.setAttribute("data-bs-toggle", "modal");
      iconTransh.setAttribute("data-bs-target", "#exampleModal");

      iconTransh.addEventListener("click", () => {
        btnDelete.addEventListener("click", () => {
          deleteContact(data[i]["id"], data);
        });
      });
    }
  }
}
btnReset.addEventListener("click", () => {
  location.reload();
});
/*
  SUPPRIMER LE CONTACTS
*/
function deleteContact(idUser, Contacts) {
  let filteredContacts = Contacts.filter((contact) => contact.id !== idUser);
  localStorage.setItem("data-contact", JSON.stringify(filteredContacts));
  location.reload();
}
/*
  MODIFIER LE CONTACTS
*/
function modifierContact(e) {
  const nomValue = nom.value.trim();
  const prenomValue = prenom.value.trim();
  const telephoneValue = telephone.value.trim();
  const groupeValue = groupe.value.trim();
  const emailValue = email.value.trim();
  const bioValue = bio.value;
  
  if (
    nomValue !== "" &&
    prenomValue !== "" &&
    telephoneValue !== "" &&
    nomValue !== "" &&
    groupeValue !== "" &&
    emailValue !== "" &&
    bioValue !== "" 
    // validMail &&
    // validTel &&
    // validNom &&
    // validPrenom &&
    // fileExist === 1
  ){
    let allTabs = JSON.parse(localStorage.getItem("data-contact"));
    let filteredContact = allTabs.filter((contact) => contact.id !== idUserModif);

    let emailExists = filteredContact.find((contact) => contact.email === emailValue);
    let telExists = filteredContact.find((contact) => contact.telephone === telephoneValue);

    if (telExists) {
      e.preventDefault();
      const erreurTel = document.querySelector(".tel-no-valide");
      erreurTel.classList.remove("remove");
      erreurTel.innerHTML = "Ce numero existe déjà dans le carnet";
      telephone.classList.add("errorInput");
    }
    if (emailExists) {
      e.preventDefault();
      const erreurMAil = document.querySelector(".mail-no-valide");
      erreurMAil.classList.remove("remove");
      erreurMAil.innerHTML = "cette email existe déjàn dans le carnet";
      email.classList.add("errorInput");
    }
    if (!telExists && !emailExists){
      let updateUser;
      if (fileUrl) {
        updateUser = {
          id: idUserModif,
          prenom: prenomValue,
          nom: nomValue,
          telephone: telephoneValue,
          groupe: groupeValue,
          email: emailValue,
          bio: bioValue,
          image: fileUrl,
        }
      }else{
        updateUser = {
          id: idUserModif,
          prenom: prenomValue,
          nom: nomValue,
          telephone: telephoneValue,
          groupe: groupeValue,
          email: emailValue,
          bio: bioValue,
          image: imageRecuperer
        }
      }
      
      let updateContacts = allTabs.map(contact => {
        if (contact.id === idUserModif) {
            return Object.assign({}, contact, updateUser);
        }
        else return contact;
      });
      localStorage.setItem("data-contact", JSON.stringify(updateContacts));
    // console.log(updateContacts)
    // e.preventDefault();
    }
  }else{
    e.preventDefault();
  }
}
/*

*/

/*
  EVENEMENT AU SUBMIT
*/
form.addEventListener("submit", function (e) {
  if (btnCreer.textContent == "Créer") {
    validation(e);
  }
  if (btnCreer.textContent == "Modifier") {
    modifierContact(e);
  }
});

afficher();
