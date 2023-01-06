const form = document.getElementById("form");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const telephone = document.getElementById("telephone");
const groupe = document.getElementById("groupe");
const email = document.getElementById("email");
const bio = document.getElementById("bio");

let tabData = [];

let file;
let fileUrl;
let fileExist = 0;
let imgTag;
const dropArea = document.getElementById("container-drap");
const btnFile = document.querySelector(".choice-file");
let inputFile = document.querySelector(".inputFile");

/*
  MODIFIER LE CONTACT
*/
const dropAreaModif = document.getElementById("container-drap-modif");
const btnFileModif = document.getElementById("choice-file-modif");
let inputFileModif = document.getElementById("inputFileModif");

btnFileModif.onclick = () => {
  inputFileModif.click();
};
inputFileModif.addEventListener("change", () => {
  file = inputFile.files[0];
  fileExist = inputFile.files.length;
  displayFileModal(dropAreaModif);
});
/*
    GLISSER DEPOSER
*/
// Quand l'image est sur le Area
dropAreaModif.addEventListener("dragover", (event) => {
  event.preventDefault();
  // console.log('image is in');
  dropAreaModif.classList.add("container-drap-event");
});
// Quand l'image quitte le Area
dropAreaModif.addEventListener("dragleave", (event) => {
  // console.log('image leave');
  dropAreaModif.classList.remove("container-drap-event");
});
// Quand l'image deposer le Area
dropAreaModif.addEventListener("drop", (event) => {
  event.preventDefault();

  //recuperer l image
  file = event.dataTransfer.files[0];
  fileExist = event.dataTransfer.files.length;
  // console.log(fileExist);
  // console.log(file)
  displayFile(dropAreaModif);
});

/*
    RECUPERER L IMAGE PAR L INPUT TYPE FILE
*/
//Donner le comportement de l input au boutton choisi
btnFile.onclick = () => {
  inputFile.click();
};
inputFile.addEventListener("change", () => {
  file = inputFile.files[0];
  fileExist = inputFile.files.length;
  // console.log(fileExist);
  displayFile(dropArea);
});

/*
    GLISSER DEPOSER
*/
// Quand l'image est sur le Area
dropArea.addEventListener("dragover", (event) => {
  event.preventDefault();
  // console.log('image is in');
  dropArea.classList.add("container-drap-event");
});
// Quand l'image quitte le Area
dropArea.addEventListener("dragleave", (event) => {
  // console.log('image leave');
  dropArea.classList.remove("container-drap-event");
});
// Quand l'image deposer le Area
dropArea.addEventListener("drop", (event) => {
  event.preventDefault();

  //recuperer l image
  file = event.dataTransfer.files[0];
  fileExist = event.dataTransfer.files.length;
  // console.log(fileExist);
  // console.log(file)
  displayFile(dropArea);
});

/*
    FONCTION QUI QUI FAIT DES ACTIONS SUR L IMAGE
*/
function displayFileModal(area) {
  // autoriser seulement les images
  let fileType = file.type;
  let valideExtention = ["image/jpeg", "image/png", "image/jpg"];

  if (valideExtention.includes(fileType)) {
    //FileReader permet de lire les données d'un fichier de manière asynchrone,
    let fileReader = new FileReader();

    fileReader.onload = () => {
      fileUrl = fileReader.result;
      // console.log(fileUrl);

      // imgTag = `<img src = "${fileUrl}" alt = "">`;
      const imageModal = document.createElement("img");
      imageModal.setAttribute("src", fileUrl);
      const contenuAreaModal = document.querySelector(".contenu-modal");
      contenuAreaModal.style.display = "none";
      area.appendChild(imageModal);
      const btnResetModal = document.getElementById("btn-reset-modal");
      btnResetModal.addEventListener("click", () => {
        area.removeChild(imageModal);
        contenuAreaModal.style.display = "block";
      });
    };

    fileReader.readAsDataURL(file);
  } else {
    alert("Uplader une imqge");
  }
}
/*

*/
function displayFile(area) {
  // autoriser seulement les images
  let fileType = file.type;
  let valideExtention = ["image/jpeg", "image/png", "image/jpg"];

  if (valideExtention.includes(fileType)) {
    //FileReader permet de lire les données d'un fichier de manière asynchrone,
    let fileReader = new FileReader();

    fileReader.onload = () => {
      fileUrl = fileReader.result;
      const image = document.createElement("img");
      image.setAttribute("src", fileUrl);
      const contenuArea = document.querySelector(".contenu");
      contenuArea.style.display = "none";
      area.appendChild(image);
      const btnReset = document.getElementById("btn-reset");
      btnReset.addEventListener("click", () => {
        area.removeChild(image);
        contenuArea.style.display = "block";
      });
    };

    fileReader.readAsDataURL(file);
  } else {
    alert("Uplader une imqge");
  }
}

/* 
   FONCTION QUI GERE LE FORMULAIRE ET STOCKE DANS LE TABLEAU

*/
function checkInput() {
  const nomValue = nom.value.trim();
  const prenomValue = prenom.value.trim();
  const telephoneValue = telephone.value.trim();
  const groupeValue = groupe.value.trim();
  const emailValue = email.value.trim();
  const bioValue = bio.value.trim();
  if (prenomValue === "") {
    setErrorFor(prenom, "");
  } else {
    // setSucess(prenom);
  }
  if (nomValue === "") {
    setErrorFor(nom, "");
  } else {
    // setSucess(nom);
  }
  if (telephoneValue === "") {
    setErrorFor(telephone, "");
  } else {
    // setSucess(telephone);
  }
  if (groupeValue === "") {
    setErrorFor(groupe, "");
  } else {
    // setSucess(groupe);
  }
  if (emailValue === "") {
    setErrorFor(email, "");
  } else {
    // setSucess(email);
  }
  if (bioValue === "") {
    setErrorFor(bio, "");
  } else {
    // setSucess(bio);
  }
  if (fileExist !== 1) {
    dropArea.classList.add("droAreaError");
  }
  if (
    nomValue !== "" &&
    prenomValue !== "" &&
    emailValue !== "" &&
    telephoneValue !== "" &&
    bioValue !== "" &&
    groupeValue !== "" &&
    fileExist !== 0
  ) {
    // if (localStorage.hasOwnProperty('data')) {
    //   tabData = JSON.parse(localStorage.getItem('data'));
    //   console.log(tabData);
    //   tabData.push({
    //     prenom: prenomValue,
    //     nom: nomValue,
    //     email: emailValue,
    //     telephone: telephoneValue,
    //     groupe: groupeValue,
    //     bio: bioValue,
    //     url: fileUrl,
    //   });
    // localStorage.setItem('data', JSON.stringify(tabData));

    // }else{
    //   //si on a pas encore stocker dans le local storage
    //   tabData.push({
    //     prenom: prenomValue,
    //     nom: nomValue,
    //     email: emailValue,
    //     telephone: telephoneValue,
    //     groupe: groupeValue,
    //     bio: bioValue,
    //     url: fileUrl,
    //   });
    //   localStorage.setItem('data', JSON.stringify(tabData));

    // }
    tabData.push({
      prenom: prenomValue,
      nom: nomValue,
      email: emailValue,
      telephone: telephoneValue,
      groupe: groupeValue,
      bio: bioValue,
      url: fileUrl,
    });
    console.log(tabData);
    //  localStorage.setItem('tabData', JSON.stringify(tabData));
    // console.log(tabData);
  }
}

//

function setErrorFor(input, message) {
  const error = document.querySelector(".error");

  //Set error Message
  error.textContent = message;

  //add error class
  input.className = "errorInput";
}
/*
    EVENEMENT SUR LA VALIDATION DU FORMULAIRE
*/

form.addEventListener("submit", (e) => {
  checkInput();
  e.preventDefault();

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
  const divBio = document.createElement("div");
  divBio.classList.add("bio");

  for (let i = 0; i < tabData.length; i++) {
    // je recupere la div qui affiche les contact
    sectionResultat.appendChild(divContenuResulat);
    divContenuResulat.appendChild(containerImage);
    divContenuResulat.appendChild(divContainerText);
    divContainerText.appendChild(divContTextIdentif);
    divContTextIdentif.appendChild(divNames);

    image.src = tabData[i]["url"];
    image.classList.add("img-contact");
    containerImage.appendChild(image);

    spanPrenom.textContent = tabData[i]["prenom"];
    spanNom.textContent = tabData[i]["nom"];
    spanGroupe.textContent = "- " + tabData[i]["groupe"];

    divNames.appendChild(spanPrenom);
    divNames.appendChild(spanNom);
    divNames.appendChild(spanGroupe);

    divContTextIdentif.appendChild(divIconSide);
    divIconSide.appendChild(iconPen);
    divIconSide.appendChild(iconTransh);

    divTel.textContent = tabData[i]["telephone"];
    divContainerText.appendChild(divTel);

    divBio.textContent = tabData[i]["bio"];
    divContainerText.appendChild(divBio);

    //Modifier le contact
    iconPen.setAttribute("data-bs-toggle", "modal");
    iconPen.setAttribute("data-bs-target", "#modalModifier");

    iconPen.addEventListener("click", (e) => {
      e.preventDefault();
      const prenomContact = document.getElementById("prenom-modif");
      prenomContact.value = tabData[i]["prenom"];

      const nomContact = document.getElementById("nom-modif");
      nomContact.value = tabData[i]["nom"];

      const telContact = document.getElementById("telephone-modif");
      telContact.value = tabData[i]["telephone"];

      const groupeContact = document.getElementById("groupe-modif");
      groupeContact.value = tabData[i]["groupe"];


      const emailContact = document.getElementById("email-modif");
      emailContact.value = tabData[i]["email"];
      // console.log(emailContact.value);

      const bioContact = document.getElementById("bio-modif");
      bioContact.value = tabData[i]["bio"];

      const formModal = document.getElementById("form-modal");
      formModal.addEventListener("submit", (event) => {
        event.preventDefault();
        // tabData[indice].push({
        //   prenom: prenomContact.value,
        //   nom: nomContact.value,
        //   email: emailContact.value,
        //   telephone: telContact.value,
        //   groupe: groupeContact.value,
        //   bio: bioContact.value,
        //   url: fileUrl,
        // });
        // let nouvelle = {
        //   prenom: prenomContact.value,
        //   nom: nomContact.value,
        //   email: emailContact.value,
        //   telephone: telContact.value,
        //   groupe: groupeContact.value,
        //   bio: bioContact.value,
        //   url: fileUrl,
        // };
        // tabData.splice(i, 1, nouvelle);


        tabData[i] = {
          prenom: prenomContact.value,
          nom: nomContact.value,
          email: emailContact.value,
          telephone: telContact.value,
          groupe: groupeContact.value,
          bio: bioContact.value,
          url: fileUrl,
        };
        console.log(tabData);
        sectionResultat.appendChild(divContenuResulat);
        divContenuResulat.appendChild(containerImage);
        divContenuResulat.appendChild(divContainerText);
        divContainerText.appendChild(divContTextIdentif);
        divContTextIdentif.appendChild(divNames);

        image.src = tabData[i]["url"];
        image.classList.add("img-contact");
        containerImage.appendChild(image);

        spanPrenom.textContent = tabData[i]["prenom"];
        spanNom.textContent = tabData[i]["nom"];
        spanGroupe.textContent = "- " + tabData[i]["groupe"];

        divNames.appendChild(spanPrenom);
        divNames.appendChild(spanNom);
        divNames.appendChild(spanGroupe);

        divContTextIdentif.appendChild(divIconSide);
        divIconSide.appendChild(iconPen);
        divIconSide.appendChild(iconTransh);

        divTel.textContent = tabData[i]["telephone"];
        divContainerText.appendChild(divTel);

        divBio.textContent = tabData[i]["bio"];
        divContainerText.appendChild(divBio);

      });
    });

    //Supprimer le contact
    iconTransh.setAttribute("data-bs-toggle", "modal");
    iconTransh.setAttribute("data-bs-target", "#exampleModal");

    iconTransh.addEventListener("click", (e) => {
      btnDelete.addEventListener("click", (e) => {
        deleteOneElement(sectionResultat, divContenuResulat, i, tabData);
        e.preventDefault();
      });
      e.preventDefault();
    });
  }

  // if (localStorage.hasOwnProperty('data')) {
  //   tabData = JSON.parse(localStorage.getItem('data'));
  // // tabData = JSON.parse(tabData);
  // // console.log(tabData);
  // console.log(tabData)

  // }
});

/*
  SUPPRIMER UN ELEMENT DANS LE TAB
*/
function deleteOneElement(parent, element, indice, tableau) {
  tableau.splice(indice, 1);
  parent.removeChild(element);
}

/*
  RECUPERER LES ELEMENTS A MODIFIER ET AFFICHER SUR LES INPUT
*/

function TakemodifyElement(tab, indice) {
  const prenomContact = document.getElementById("prenom-modif");
  prenomContact.value = tab[indice]["prenom"];

  const nomContact = document.getElementById("nom-modif");
  nomContact.value = tab[indice]["nom"];

  const telContact = document.getElementById("telephone-modif");
  telContact.value = tab[indice]["telephone"];

  const groupeContact = document.getElementById("groupe-modif");
  groupeContact.value = tab[indice]["groupe"];

  const emailContact = document.getElementById("email-modif");
  emailContact.value = tab[indice]["email"];

  const bioContact = document.getElementById("bio-modif");
  bioContact.value = tab[indice]["bio"];

  const formModal = document.getElementById("form-modal");
  formModal.addEventListener("submit", (e) => {
    e.preventDefault();
    // tabData[indice].push({
    //   prenom: prenomContact.value,
    //   nom: nomContact.value,
    //   email: emailContact.value,
    //   telephone: telContact.value,
    //   groupe: groupeContact.value,
    //   bio: bioContact.value,
    //   url: fileUrl,
    // });

    let nouvelle = {
      prenom: prenomContact.value,
      nom: nomContact.value,
      email: emailContact.value,
      telephone: telContact.value,
      groupe: groupeContact.value,
      bio: bioContact.value,
      url: fileUrl,
    };
    tab.splice(indice, 1, nouvelle);
    // console.log(tab);
  });
}
