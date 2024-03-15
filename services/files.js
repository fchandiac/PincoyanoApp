const server_url = process.env.API_URL;

function uploadFile(name, description, user_id, file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("description", description);
  formData.append("user_id", user_id);

  return new Promise((resolve, reject) => {
    fetch(server_url + "files/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al subir el archivo");
        }
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function findAll() {
  const product_ = new Promise((resolve, reject) => {
    fetch(server_url + "files/findAll", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return product_;
}

function checkFileExists(filename) {
  const data = { filename };
  return new Promise((resolve, reject) => {
    fetch(server_url + "files/checkFileExists", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al verificar la existencia del archivo");
        }
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function deleteFile(filename) {
  const data = { filename };
  return new Promise((resolve, reject) => {
    fetch(server_url + "files/deleteFile", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar el archivo");
        }
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function destroy(id) {
  let data = { id };
  return new Promise((resolve, reject) => {
    fetch(server_url + "files/destroy", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al eliminar el archivo");
        }
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export { uploadFile, findAll, checkFileExists, deleteFile, destroy };
