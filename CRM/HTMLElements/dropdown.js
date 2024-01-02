export class MyDropdown extends HTMLButtonElement {
    constructor(_id, _class, _placeholder, _options) {
      super();
  console.log("ds class");
      if (_id) this.id = _id;
      if (_class) this.className = _class;
  
      const button = document.createElement("button");
      button.innerText = _placeholder || "Select an option";
      button.className = "dropdown-trigger";
      button.addEventListener("click", () => this.toggleDropdown());
  
      this.appendChild(button);
  
      const dropdownContent = document.createElement("div");
      dropdownContent.className = "dropdown-content";
  
      if (_options) {
        _options.forEach((option) => {
          const optionElement = document.createElement("div");
          optionElement.innerText = option;
          optionElement.addEventListener("click", () => this.handleOptionClick(option));
          dropdownContent.appendChild(optionElement);
        });
      }
  
      this.appendChild(dropdownContent);
    }
  
    toggleDropdown() {
      console.log("Toggle Dropdown Clicked");
      const dropdownContent = this.querySelector(".dropdown-content");
      if (dropdownContent) {
        dropdownContent.classList.toggle("show");
      } else {
        console.error("Dropdown content not found");
      }
    }
  
    handleOptionClick(option) {
      console.log("Option Clicked:", option);
      const button = this.querySelector(".dropdown-trigger");
      if (button) {
        button.innerText = option;
        this.toggleDropdown();
      } else {
        console.error("Dropdown trigger button not found");
      }
    }
  }
  
  customElements.define("my-dropdown", MyDropdown, { extends: "button" });
  