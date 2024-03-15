const server_url = process.env.API_URL

function create(name, description, category_id) {
  let data = { name, description, category_id };
  const subcategorie_ = new Promise((resolve, reject) => {
    fetch(server_url + "subcategories/create", {
      method: "POST",
      body: JSON.stringify(data),
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
  return subcategorie_;
}

function findAll() {
  const subcategorie_ = new Promise((resolve, reject) => {
    fetch(server_url + "subcategories/findAll", {
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
  return subcategorie_;
}

function findAllByCategory(category_id) {
  let data = { category_id };
  const subcategorie_ = new Promise((resolve, reject) => {
    fetch(server_url + "subcategories/findAllByCategory", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          } else {
            resolve(res.data);
          }
        }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
  return subcategorie_;
}

function findOneByName(name) {
  let data = { name };
  const subcategorie_ = new Promise((resolve, reject) => {
    fetch(server_url + "subcategories/findOneByName", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        res.json().then((res) => {
          if (res.code === 0) {
            reject(res.data);
          }
          else {
            resolve(res.data);
          }
        }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
  return subcategorie_;
}

function findOneById(id) {
  let data = { id };
  const subcategorie_ = new Promise((resolve, reject) => {
    fetch(server_url + "subcategories/findOneById", {
      method: "POST",
      body: JSON.stringify(data),
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
  return subcategorie_;
}

function update(id, name, description, categoryId) {
  let data = { id, name, description, categoryId };
  const subcategorie_ = new Promise((resolve, reject) => {
    fetch(server_url + "subcategories/update", {
      method: "POST",
      body: JSON.stringify(data),
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
  return subcategorie_;
}

function destroy(id) {
  let data = { id };
  const subcategorie_ = new Promise((resolve, reject) => {
    fetch(server_url + "subcategories/destroy", {
      method: "POST",
      body: JSON.stringify(data),
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
  return subcategorie_;
}

module.exports = {
  create,
  findAll,
  findOneById,
  update,
  destroy,
  findOneByName,
  findAllByCategory
};