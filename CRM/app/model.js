export function getAllData() {
  const url = "https://sabik-4c768e.appdrag.site/api/auth/getAllData";
  const data = {
    AD_PageNbr: "1",
    AD_PageSize: "500",
  };

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur de réseau");
        }
        return response.json();
      })
      .then((result) => {
        if (result && result.Table) {
         // console.log(result.Table);
          resolve(result);
        } else {
          throw new Error(
            "La propriété Table est absente ou vide dans la réponse"
          );
        }
      })
      .catch((error) => {
        console.error("Erreur pour récupérer les données", error);

        reject(error);
      });
  });
}

export function getDataByIdAndUpdate(id) {
  console.log(id);
  const urlGetDataById = `https://sabik-4c768e.appdrag.site/api/auth/getDataById?id=${id}`;
  return new Promise((resolve, reject) => {
    fetch(urlGetDataById, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur de réseau");
          
        }
        return response.json();
      })
      .then((dataById) => {
        console.log(dataById.Table[0]);
        return getAllData()
          .then((allData) => {
            console.log(allData.Table);
            const indexToUpdate = allData.Table.findIndex(
              (item) => item.id === id
              
            );
            console.log(indexToUpdate)
            if (indexToUpdate !== -1) {
              
              allData.Table[indexToUpdate] = dataById.Table[0];
            } else {
              allData.Table.push(dataById.Table[0]);
            }

            resolve(allData);
          })
          .catch((error) => {
            console.error("Error fetching all data", error);
            resolve(dataById);
          });
      })
      .catch((error) => {
        console.error("Error fetching data by ID", error);
        reject(error);
      });
  });
}

export function verifyCode(username, pin) {
  const url = `https://sabik-4c768e.appdrag.site/api/auth/auth?username=${username}&pin=${pin}&AD_PageNbr=1&AD_PageSize=500`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        if (result.ok) {
          return result.json();
        }
        throw new Error(result.status);
      })
      .then((data) => {
        if (data && data.Table && data.Table.length > 0) {
          resolve(data);
        } else {
          throw new Error(
            "La propriété Table est absente ou vide dans la réponse"
          );
        }
      })

      .catch((error) => {
        console.error("Erreur lors de la vérification du code:", error);
        reject(error);
      });
  });
}

export function deleteAndRefresh(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://sabik-4c768e.appdrag.site/api/deleteRowById?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          getAllData()
            .then((updatedResult) => {
              const filteredData = updatedResult.Table.filter(
                (item) => item.id !== id
              );

              resolve(filteredData);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject("Erreur lors de la suppression de la ligne.");
        }
      })
      .catch((error) => {
        reject("Une erreur s'est produite : " + error.message);
      });
  });
}

export function editRowById(username, lastname, firstname, role, pin, id) {
  var FD = new FormData();

  FD.append("id", id);
  FD.append("username", username);
  FD.append("lastname", lastname);
  FD.append("firstname", firstname);
  FD.append("role", role);
  FD.append("pin", pin);
  return new Promise((resolve, reject) => {
    fetch(`https://sabik-4c768e.appdrag.site/api/updateRowById`, {
      method: "POST",
      body: FD,
    })
      .then((response) => {
        if (response.ok) {
          resolve("maj");
         
        } else {
          reject("Erreur lors de la modif de la ligne.");
        }
      })
      .catch((error) => {
        reject("Une erreur s'est produite : " + error.message);
      });
  });
}

export function addNewRow(username, lastname, firstname, role, pin) {
  var FD = new FormData();

  FD.append("username", username);
  FD.append("lastname", lastname);
  FD.append("firstname", firstname);
  FD.append("role", role);
  FD.append("pin", pin);

  return new Promise((resolve, reject) => {
    fetch(`https://sabik-4c768e.appdrag.site/api/addData`, {
      method: "POST",
      body: FD,
    })
      .then((response) => {
        if (response.ok) {
          getId(username, lastname, firstname, role, pin)
            .then((id) => {
              getDataByIdAndUpdate(id)
                .then((updatedData) => {
                  resolve(updatedData);
                })
                .catch((error) => {
                  reject(
                    "Erreur lors de la mise à jour des données après ajout" +
                      error
                  );
                });
            })
            .catch((error) => {
              reject(
                "Erreur lors de la récupération de l'ID après ajout : " +
                  error.message
              );
            });
        } else {
          reject("Erreur lors de l'ajout de la ligne.");
        }
      })
      .catch((error) => {
        reject(
          "Une erreur s'est produite lors de l'ajout de la ligne : " +
            error.message
        );
      });
  });
}

export function getId(username, lastname, firstname, role, pin) {
  const url = `https://sabik-4c768e.appdrag.site/api/auth/getId?username=${username}&lastname=${lastname}&firstname=${firstname}&role=${role}&pin=${pin}`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur de réseau");
        }
        return response.json();
      })
      .then((result) => {
        if (result && result.Table.length > 0) {
          resolve(result.Table[0].id);
        } else {
          throw new Error("ID non trouvé dans la réponse");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'ID:", error);
        reject(error);
      });
  });
}
