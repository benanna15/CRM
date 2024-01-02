import * as View from "./view.js";
import * as Model from "./model.js";
View.init();
export function init() {
  View.setHomeReadyCallback(() => {
    auth(View.Home.username, View.Home.code);
  });
}

export function auth(username, code) {
  let userData;

  Model.verifyCode(username, code)
    .then((data) => {
      userData = data.Table[0];
      if (userData) {
        getData(userData);
     
      }
    })
    .catch((error) => {
      console.log(error);

      init();
      View.displayError();
    });
}

export function getData(data) {
  Model.getAllData()
    .then((allData) => {
      const sortedTable = allData.Table.sort((a, b) => b.id - a.id);
      View.dashboard(
        data.firstname,
        data.role,
        sortedTable,
        data.id,
        data.button
      );
      handleRowActions(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function handleRowActions(data) {
  View.agree((rowId) => {
    Model.deleteAndRefresh(rowId)
      .then((filteredData) => {
        const sortedTable = filteredData.sort((a, b) => b.id - a.id);

        View.dashboard(
          data.firstname,
          data.role,
          sortedTable,
          data.id,
          data.button
        );
      })
      .catch((errorMessage) => {
        console.error(errorMessage);
      });
  });

  View.updateRow((inputData) => {
    Model.editRowById(
      inputData.username,
      inputData.lastname,
      inputData.firstname,
      inputData.role,
      inputData.pin,
      inputData.id
    )
      .then((successMessage) => {
        console.log(successMessage);
      })
      .then(() => {
        return Model.getDataByIdAndUpdate(inputData.id);
      })
      .then((updatedAllData) => {
        const sortedTable = updatedAllData.Table.sort((a, b) => b.id - a.id);

        View.dashboard(
          data.firstname,
          data.role,
          sortedTable,
          data.id,
          data.button
        );
      })

      .catch((error) => {
        console.log(error);
      });
  });

  View.addNewRow((inputData) => {
    Model.addNewRow(
      inputData.username,
      inputData.lastname,
      inputData.firstname,
      inputData.role,
      inputData.pin
    )
      .then((updatedAllData) => {
        const sortedTable = updatedAllData.Table.sort((a, b) => b.id - a.id);

        View.dashboard(
          data.firstname,
          data.role,
          sortedTable,
          data.id,
          data.button
        );
      })

      .catch((error) => {
        console.log(error);
      });
  });


 
}
