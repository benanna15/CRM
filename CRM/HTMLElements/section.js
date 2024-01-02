export class MySection extends HTMLDivElement {
    constructor(_id, _class,_text) {
      super();
      if (_id) this.id = _id;
      if (_class) this.className = _class;
      if (_text) {
        this.innerText = _text;
        this.className+=" text "
      
      }
  
    }
  }
  
  customElements.define("my-section", MySection, { extends: "div" });