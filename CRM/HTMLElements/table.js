export class MyTable extends HTMLTableElement {
  constructor(_id, _class) {
    super();
    if (_id) this.id = _id;
    if (_class) this.className = _class;
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    this.appendChild(thead);
    this.appendChild(tbody);
  }

  addHeaderRow(columnTexts) {
    const thead = this.querySelector("thead");

    const headerRow = this.createRow("th", columnTexts);
    thead.appendChild(headerRow);
  }

  addDataRowWithId(id, cellTexts) {
    const tbody = this.querySelector("tbody");
  
    const dataRow = this.createRow("td", cellTexts);
    dataRow.dataset.id = id; // Set the data-id attribute for identification
    
    tbody.appendChild(dataRow);
  }
  
  // Modify the existing addDataRow method if you still need it
  addDataRow(cellTexts) {
    const tbody = this.querySelector("tbody");
  
    const dataRow = this.createRow("td", cellTexts);
    tbody.appendChild(dataRow);
  }

  addDataRows(rowData) {
    const tbody = this.querySelector("tbody");
    const dataRows = this.createRow("td", rowData);
    
    tbody.appendChild(dataRows);
  }
  removeDataRowById(id) {
    const tbody = this.querySelector("tbody");
    const rowToRemove = tbody.querySelector(`tr[data-id="${id}"]`);
  
    if (rowToRemove) {
      tbody.removeChild(rowToRemove);
    }
  }
  removeDataRowById(id) {
    const tbody = this.querySelector("tbody");
    const rowToRemove = tbody.querySelector(`tr[data-id="${id}"]`);

    if (rowToRemove) {
      tbody.removeChild(rowToRemove);
    }
  }
  replaceDataRowById(id, newCellTexts) {
    const tbody = this.querySelector("tbody");
  
    // Recherchez la ligne existante avec l'ID spécifié
    const existingRow = tbody.querySelector(`tr[data-id="${id}"]`);
  
    if (existingRow) {
      // Créez une nouvelle ligne avec les nouveaux contenus
      const newRow = this.createRow("td", newCellTexts);
      newRow.dataset.id = id;
  
      // Remplacez la ligne existante par la nouvelle ligne
      tbody.replaceChild(newRow, existingRow);
    }
  }

  
  createRow(cellElementName, cellContents) {
   
    const row = document.createElement("tr");

    cellContents.forEach(cellContent => {
      const cell = document.createElement(cellElementName);

      if (typeof cellContent === "string") {
          // Si le contenu est une chaîne de caractères, utilisez textContent
          cell.textContent = cellContent;
      } else if (cellContent instanceof HTMLElement) {
          // Si le contenu est un élément HTML, ajoutez-le directement
          cell.appendChild(cellContent);
      }

      row.appendChild(cell);
  });
  
    return row;
  }
}

customElements.define("my-table", MyTable, { extends: "table" });
