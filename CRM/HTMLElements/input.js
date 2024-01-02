export class MyInput extends HTMLInputElement {
    constructor(_id, _class, _type, _placeholder, _defaultValue) {
      super();
      if (_id) this.id = _id;
      if (_class) this.className = _class;
      this.type = _type;
      this.placeholder = _placeholder;
      if (_defaultValue) this.value = _defaultValue; 
      

    }
  }
  
  customElements.define("my-input", MyInput, { extends: "input" });