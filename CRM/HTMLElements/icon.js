export class MyIcon extends HTMLSpanElement {
    constructor(_iconId, _iconClass, _text, _callback) {
        super();

        // Créer un élément <i> (icône)
        const iconElement = document.createElement('i');
        if (_iconId) iconElement.id = _iconId;
        if (_iconClass) iconElement.classList.add(_iconClass);
        if (_text) iconElement.innerText = _text;

        // Ajouter l'icône à l'élément <span>
        this.appendChild(iconElement);

        this.addEventListener("click", _callback);
    }
}

customElements.define("my-icon", MyIcon, { extends: "span" });

