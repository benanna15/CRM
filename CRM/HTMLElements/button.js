export class MyButton extends HTMLButtonElement {
    constructor(_id, _class, _text, _callback) {
      super();
      if (_id) this.id = _id;
      if (_class) this.className = _class;
      this.innerHTML=_text
      this.addEventListener("click", _callback);
    }
  }
  customElements.define("my-button", MyButton, { extends: "button" });

  