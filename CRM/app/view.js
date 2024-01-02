import { MySection } from "../HTMLElements/section.js";
import { MyButton } from "../HTMLElements/button.js";
import { MyInput } from "../HTMLElements/input.js";
import { MyTable } from "../HTMLElements/table.js";


import CSS from "./style.css" assert { type: "css" };

document.adoptedStyleSheets.push(CSS);

var main = document.getElementById("main");
var $main = $(main);

export var code = "";
export var Home = {};
var trials = 0;
let numericKeyboardVisible = false;
let addButton = false;
let homeReadyCallback = null;
let buttonAgree = null;
let buttonlogOut = null
let buttonDisagree = null;
let save = null;
let saveNewRow = null;
const contentSection = new MySection(
  "contentSections",
  "container container-border ",
  ""
);

export function init() {
  contentSection.innerHTML = "";

  
  hideNumericKeyboard();
  const inputSection = new MySection(
    "inputSection",
    "container input-field center-align",
    ""
  );
  const input = new MyInput(
    "usernameInput",
    "validate center-align input-style",
    "text",
    "Enter username"
  );
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      pinButton.click();
      input.blur();
    }
  });
  input.addEventListener("input", function (event) {
    if (numericKeyboardVisible) {
      event.preventDefault();
    }
  });
  const buttonSection = new MySection(
    "buttonSection",
    "center-align container col",
    ""
  );
  const pinButton = new MyButton(
    "pinButton",
    "waves-effect waves-light btn center-align",
    "PIN",
    () => {
      if (input.value.trim() === "") {
        input.classList.add("invalid");
        M.toast({ html: "Please enter the username." });
      } else {
        if (!numericKeyboardVisible) {
          showNumericKeyboard();
          numericKeyboardVisible = true;
        }

        Home.username = input.value;
      }
    }
  );

  main.appendChild(contentSection);
  inputSection.appendChild(input);

  contentSection.appendChild(inputSection);
  contentSection.appendChild(buttonSection);
  buttonSection.appendChild(pinButton);
}

export function showNumericKeyboard() {
  const keyboardSection = new MySection(
    "keyboardSection",
    "container section grid-container  ",
    ""
  );

  // Créer les boutons du clavier numérique
  for (let i = 0; i <= 9; i++) {
    const button = new MyButton(
      `btn${i}`,
      "waves-effect waves-light  btn-ocean",
      i,
      () => {
        const audio = new Audio("./assets/click.wav");
        audio.play();
        if (code.length < 4) {
          code += i;
        }

        if (code.length === 4) {
          Home.code = code;
          getHome();

          return;
        }

        button.classList.remove("btn-ocean");
        button.classList.add("btn-clicked");
      }
    );
    keyboardSection.appendChild(button);
  }

  // Ajouter le clavier numérique à la section centrée
  contentSection.appendChild(keyboardSection);

  // Ajouter l'animation jQuery
  $(keyboardSection).hide().fadeIn(1000);

  // Ajouter un gestionnaire d'événements pour les touches du clavier physique
  document.addEventListener("keydown", handleKeyDown);

  return;
}

export function handleKeyDown(event) {
 
  if (event.key >= "0" && event.key <= "9") {
    const audio = new Audio("./assets/click.wav");

    audio.play();
   
    const button = document.getElementById(`btn${event.key}`);
    button.classList.remove("btn-ocean");
    button.classList.add("btn-clicked");

    if (/^\d$/.test(event.key)) {
      if (code.length < 4) {
        code += event.key;

        if (code.length === 4) {
          Home.code = code;
          getHome();
          document.removeEventListener("keydown", handleKeyDown);
         
          return;
        }
      }
    }
  }
  
}

export function getHome() {
  if (Home.code && Home.username) {
    if (homeReadyCallback) {
      homeReadyCallback();
    }
    return Home;
  } else {
    return null;
  }
}

export function setHomeReadyCallback(callback) {
  homeReadyCallback = callback;
}
export function displayError() {
  trials++;
  if(trials ===3){
  alert()
  }else{
    const audio = new Audio("./assets/buzz.wav");
    audio.play();
  
    M.toast({ html: "Authentification error", classes: "black" });
  }
 

  if (numericKeyboardVisible) {
    hideNumericKeyboard();
    var input = document.getElementById("usernameInput");
    input.value = "";
  }
  code = "";
  Home = {};

  
}

function hideNumericKeyboard() {
  const keyboardSection = document.getElementById("keyboardSection");
  if (keyboardSection) {
    contentSection.removeChild(keyboardSection);
    numericKeyboardVisible = false;
  }
}

export function alert() {

    M.toast({ html: "The police is coming", classes: "red" });
    trials=0
    const audio = new Audio("./assets/alarme.wav");
    audio.volume = 0;
    $(audio).animate(
      { volume: 1 },
      {
        duration: 1500,
        start: function () {
          audio.play();
        },
        complete: function () {
          $(audio).animate(
            { volume: 0 },
            {
              duration: 2000,
              complete: function () {
                audio.pause();
              },
            }
          );
        },
      }
    );
    if (numericKeyboardVisible) {
      hideNumericKeyboard();
      var input = document.getElementById("usernameInput");
      input.value = "";
    }
    code = "";
    Home = {};
   
  
}

export function icon(_class, _icon, _text, _id) {
  const iconElement = document.createElement("i");
  const spanElement = document.createElement("span");

  iconElement.className = "icon material-icons";
  iconElement.innerHTML = _class;
  iconElement.innerText = _icon;
  spanElement.innerText = _text;
  spanElement.className = "icon-text";

  const container = document.createElement("div");
  container.className = "icon-container";
  container.id = _id;

  container.appendChild(iconElement);
  container.appendChild(spanElement);

  return container;
}

export function dashboard(name, role, data, id) {
  //header
  const newContentSection = new MySection("contentSection", "section  ", "");
  const welcomeRoleContainer = new MySection(
    "welcomeRoleContainer",
    "section  card-panel teal lighten-2",
    ""
  );
  const welcomeSection = new MySection(
    "welcomeSection",
    " black-text text-darken-2 ",
    `Welcome ${name} !`
  );
  const roleSection = new MySection(
    "roleSection",
    " blue-grey-text text-lighten-4",
    `${role}`
  );
  const iconLogOut= icon("material-icons","logout","Log Out","lgIcon")
  const disconnectButton= new MyButton(
    "dbutton",
    "btn-floating btn-large waves-effect waves-light  cyan darken-4 right",
    iconLogOut.innerHTML,
   
    )
    disconnectButton.addEventListener('click',() => {
    
      main.innerHTML = ""
      init()
      const input = document.getElementById("usernameInput");
   input.value = "";
   numericKeyboardVisible = false;
      code = "";
      Home = {};
      trials=0
     
      
    })
  //body - table avec les utilisateurs
  const newTable = new MyTable("mytable", "highlight ");
  newTable.addHeaderRow(["Username", "First name", "Last Name", "Pin", "Role"]);
  // info perso de l utilisateur connecte
  const userInfoSection = new MySection(
    "userInfoSection",
    " cyan lighten-4 card-content",
    " "
  );
  const userSection = document.createElement("span");
  userSection.innerText = "My Information";
  userSection.className = "card-title title-info";
  userInfoSection.appendChild(userSection);
  const infos = new MySection("infos", "card-content ", "");
  const idTable = new MyTable("id-table", "highlight ");
  idTable.addHeaderRow(["Username", "First name", "Last Name", "Pin", "Role"]);

  infos.appendChild(idTable);
  userInfoSection.appendChild(infos);

  //les sections s affichent ds le main
  main.innerHTML = "";
  welcomeRoleContainer.appendChild(disconnectButton);
  welcomeRoleContainer.appendChild(welcomeSection);
 
  welcomeRoleContainer.appendChild(roleSection);
  
  newContentSection.appendChild(welcomeRoleContainer);

  newContentSection.appendChild(userInfoSection);
  // si admin bouton add s affiche

  if (role !== "Salesman") {
    const section = new MySection("section", "", "");
    const addSection = new MyButton(
      "addSection",
      " btn-floating btn-large waves-effect waves-light red right ",
      "",
      () => {
        if (!addButton) {
          addButton = true;
          addRow(section, data, role);
        }
      }
    );
    const iconAdd = icon("material-icons ", "add", "");
    section.appendChild(addSection);
    addSection.appendChild(iconAdd);
    newContentSection.appendChild(section);
  }

  newContentSection.appendChild(newTable);
  main.appendChild(newContentSection);

  displayContent(data, idTable, newTable, id, role);
}

export function displayContent(data, idTable, newTable, id, role) {
  const inputRowsMap = new Map();
  //je recupere les donnees et je boucle avec forEach
  data.forEach((rowData) => {
    const Username = rowData.username;
    const Firstname = rowData.firstname;
    const Lastname = rowData.lastname;
    const Pin = "****";
    const Role = rowData.role;
    let options = [];

    // les icones
    const iconDelete = icon(
      "material-icons",
      "delete",
      "Delete",
      "delete_" + rowData.id
    );
    iconDelete.classList.add("icon-pointer", "icon-delete");
    iconDelete.addEventListener("click", () => {
      if (role === "Manager" && rowData.role !== "Salesman") {
      } else if (role === "Salesman") {
      } else {
        const modalSection = createModal(
          "Confirmation",
          "Are you sure you want to delete?",
          () => {
            buttonAgree(rowData.id);
          },
          () => {}
        );

        M.Modal.getInstance(modalSection).open();
      }
    });

    const iconModify = icon(
      "material-icons",
      "edit",
      "Edit",
      "edit_" + rowData.id
    );
    iconModify.classList.add("icon-pointer", "icon-edit");
    iconModify.addEventListener("click", () => {
      if (
        role === "Manager" &&
        rowData.role !== "Salesman" &&
        rowData.id !== id
      ) {
      } else if (role === "Salesman" && rowData.id !== id) {
      } else {
        if (rowData.id === id) {
          idTable.replaceDataRowById(rowData.id, inputRow);
        } else {
          newTable.replaceDataRowById(rowData.id, inputRow);
        }
      }
    });
    const iconSave = icon(
      "material-icons",
      "save",
      "Save",
      "save_" + rowData.id
    );
    iconSave.classList.add("icon-pointer");
    iconSave.classList.add("green-text");
    iconSave.addEventListener("click", () => {
      addButton = false;
      const inputRow = inputRowsMap.get(rowData.id);

      if (inputRow) {
        const usernameValue = inputRow[0].value;
        const firstnameValue = inputRow[1].value;
        const lastnameValue = inputRow[2].value;
        const pinValue = inputRow[3].value;
        const roleValue = inputRow[4].value;

        if (
          usernameValue &&
          firstnameValue &&
          lastnameValue &&
          pinValue &&
          roleValue !== "no"
        ) {
          const inputData = {
            username: usernameValue,
            firstname: firstnameValue,
            lastname: lastnameValue,
            pin: pinValue,
            role: roleValue,
            id: rowData.id,
          };
          save(inputData);
        } else {
          M.toast({ html: "Please fill in all fields.", classes: "red-toast" });
          // Au moins un champ est vide, appliquez la classe pour le mettre en rouge
          if (!usernameValue) {
            inputRow[0].classList.add("invalid");
          }
          if (!firstnameValue) {
            inputRow[1].classList.add("invalid");
          }
          if (!lastnameValue) {
            inputRow[2].classList.add("invalid");
          }
          if (!pinValue) {
            inputRow[3].classList.add("invalid");
          }
          if (!roleValue) {
            inputRow[4].classList.add("invalid");
          }
        }
      }
    });

    const iconClear = icon(
      "material-icons",
      "clear",
      "",
      "clear_" + rowData.id
    );
    iconClear.classList.add("red-text", "icon-pointer");
    iconClear.addEventListener("click", () => {
      if (rowData.id === id) {
        idTable.replaceDataRowById(rowData.id, [
          Username,
          Firstname,
          Lastname,
          Pin,
          Role,
          iconModify,
        ]);
      } else {
        newTable.replaceDataRowById(rowData.id, [
          Username,
          Firstname,
          Lastname,
          Pin,
          Role,
          iconModify,
          iconDelete,
        ]);
      }
    });

    //options
    if (role === "Manager") {
      options =
        rowData.id === id
          ? [
              { value: "no", text: "Select an option" },
              { value: "Manager", text: "Manager" },
              { value: "Salesman", text: "Salesman" },
            ]
          : [
              { value: "no", text: "Select an option" },
              { value: "Salesman", text: "Salesman" },
            ];

      if (rowData.role !== "Salesman" && rowData.id !== id) {
        addDisabledStylesToIcon(iconModify);
        addDisabledStylesToIcon(iconDelete);
      }
    } else if (role === "Salesman") {
      options =
        rowData.id === id
          ? [
              { value: "no", text: "Select an option" },
              { value: "Salesman", text: "Salesman" },
            ]
          : [];
      if (rowData.id !== id) {
        addDisabledStylesToIcon(iconDelete);
        addDisabledStylesToIcon(iconModify);
      }
    } else if (role === "Administrator") {
      options =
        rowData.id === id
          ? [
              { value: "no", text: "Select an option" },
              { value: "Administrator", text: "Administrator" },
              { value: "Manager", text: "Manager" },
              { value: "Salesman", text: "Salesman" },
            ]
          : [
              { value: "no", text: "Select an option" },
              { value: "Manager", text: "Manager" },
              { value: "Salesman", text: "Salesman" },
            ];
    }

    //les input
    const inputRow = [
      new MyInput("username-input", "", "text", "", Username),
      new MyInput("firstname-input", "", "text", "", Firstname),
      new MyInput("lastname-input", "", "text", "", Lastname),
      new MyInput("pin-input", "", "text", "", rowData.pin),
      //new MyInput("roleInput", "", "select", "Role", "", ["Administrator", "Manager", "Salesman"]),
      createDropdown(options),
      iconSave,
      iconClear,
    ];
    // affiche les infos de l utilisateur connecte si id === rowData.id
    inputRowsMap.set(rowData.id, inputRow);
    if (id === rowData.id) {
      idTable.addDataRowWithId(rowData.id, [
        Username,
        Firstname,
        Lastname,
        Pin,
        Role,
        iconModify,
      ]);
    }
    // sinon si id different, alors ca va ds le body ou tous les utilisateurs s affichent
    else {
      newTable.addDataRowWithId(rowData.id, [
        Username,
        Firstname,
        Lastname,
        Pin,
        Role,
        iconModify,
        iconDelete,
      ]);
    }
  });
}

function addDisabledStylesToIcon(icon) {
  icon.classList.add("grey-text", "no-pointer-events");
  icon.classList.add("tooltipped");
  icon.setAttribute("data-tooltip", "Not allowed admin only");
  M.Tooltip.init(icon);
}

export function addRow(section, data, role) {
  let options = [];

  if (role === "Manager") {
    options = [
      { value: "no", text: "Select an option" },
      { value: "Salesman", text: "Salesman" },
    ];
  } else {
    options = [
      { value: "no", text: "Select an option" },
      { value: "Manager", text: "Manager" },
      { value: "Salesman", text: "Salesman" },
    ];
  }

  const inputRowsMap = new Map();
  const newTable = new MyTable("mytable", "highlight ");
  newTable.addHeaderRow(["Username", "First name", "Last Name", "Pin", "Role"]);
  const iconSave = icon("material-icons", "save", "");
  iconSave.classList.add("icon-pointer");
  iconSave.classList.add("green-text");
  iconSave.addEventListener("click", () => {
    const usernameValue = document.getElementById("usernameInput").value;
    const firstnameValue = document.getElementById("firstnameInput").value;
    const lastnameValue = document.getElementById("lastnameInput").value;
    const pinValue = document.getElementById("pinInput").value;
    const roleValue = document.getElementById("roleInput").value;

    if (
      usernameValue &&
      firstnameValue &&
      lastnameValue &&
      pinValue &&
      roleValue !== "no"
    ) {
      const inputData = {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        pin: pinValue,
        role: roleValue,
      };
      saveNewRow(inputData);
    } else {
      M.toast({ html: "Please fill in all fields.", classes: " red " });
      // Au moins un champ est vide, appliquez la classe pour le mettre en rouge
      if (!usernameValue) {
        document.getElementById("usernameInput").classList.add("invalid");
      }
      if (!firstnameValue) {
        document.getElementById("firstnameInput").classList.add("invalid");
      }
      if (!lastnameValue) {
        document.getElementById("lastnameInput").classList.add("invalid");
      }
      if (!pinValue) {
        document.getElementById("pinInput").classList.add("invalid");
      }
      if (!roleValue) {
        document.getElementById("roleInput").classList.add("invalid");
      }
    }
  });
  const iconClear = icon("material-icons", "clear", "");
  iconClear.classList.add("red-text");
  iconClear.classList.add("icon-pointer");
  iconClear.addEventListener("click", () => {
    section.removeChild(newTable);
    addButton = false;
  });

  newTable.addDataRow([
    new MyInput("usernameInput", "", "text", "Username"),
    new MyInput("firstnameInput", "", "text", "Firstname"),
    new MyInput("lastnameInput", "", "text", "Lastname"),
    new MyInput("pinInput", "", "password", "****"),
    createDropdown(options),
    iconSave,
    iconClear,
  ]);
  section.appendChild(newTable);
}

export function createModal(
  headerText,
  bodyText,
  agreeCallback,
  disagreeCallback
) {
  // Créer les éléments du modal
  const modalSection = document.createElement("div");
  modalSection.id = "modal1";
  modalSection.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");
  modalContent.innerHTML = `
    <h4>${headerText}</h4>
    <p>${bodyText}</p>
  `;

  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");

  const agreeLink = document.createElement("a");
  agreeLink.href = "#!";
  agreeLink.classList.add(
    "modal-close",
    "waves-effect",
    "waves-green",
    "btn-flat"
  );
  agreeLink.innerText = "Agree";
  if (agreeCallback) {
    agreeLink.addEventListener("click", agreeCallback);
  }

  const disagreeLink = document.createElement("a");
  disagreeLink.href = "#!";
  disagreeLink.classList.add(
    "modal-close",
    "waves-effect",
    "waves-red",
    "btn-flat"
  );
  disagreeLink.innerText = "Disagree";
  if (disagreeCallback) {
    disagreeLink.addEventListener("click", disagreeCallback);
  }

  // Ajout des éléments au modal
  modalFooter.appendChild(agreeLink);
  if (disagreeCallback) {
    modalFooter.appendChild(disagreeLink);
  }
  modalSection.appendChild(modalContent);
  modalSection.appendChild(modalFooter);

  document.body.appendChild(modalSection);

  M.Modal.init(modalSection);

  return modalSection;
}

export function agree(callback) {
  buttonAgree = (rowId) => {
    callback(rowId);
  };
}
export function logOutButton(callback) {
  buttonlogOut=()=>{callback()}
  
}
// export function disagree(callback){
//   buttonDisagree=callback

// }

export function updateRow(callback) {
  save = (inputData) => callback(inputData);
}

export function addNewRow(callback) {
  saveNewRow = (inputData) => callback(inputData);
}

function createDropdown(options) {
  const select = document.createElement("select");
  select.classList.add("browser-default");
  select.id = "roleInput";

  options.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData.value;
    option.text = optionData.text;
    select.appendChild(option);
  });

  M.FormSelect.init(select);
  return select;
}
