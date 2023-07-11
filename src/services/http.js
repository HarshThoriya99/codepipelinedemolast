import axios from "axios";

const API_URL = "http://192.168.1.233:3002/api/v1";

export default class Http {
  static get(url, params) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      let _newToken = JSON.parse(token);
      axios({
        method: "get",
        url: `${API_URL}/${url}`,
        headers: {
          Authorization: _newToken,
          contentType: "multipart/form-data",
        },
        params: params,
      })
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error, "error");
          reject(error);
        });
    });
  }
  static post(url, body) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      let _newToken = JSON.parse(token);
      axios({
        method: "post",
        url: `${API_URL}/${url}`,
        data: body,
        headers: {
          Authorization: _newToken,
          contentType: "multipart/form-data",
        },
      })
        .then(function (response) {
          resolve(response.data);
          console.log(response.data, "data");
        })
        .catch(function (error) {
          console.log(error, "error");
          reject(error);
        });
    });
  }
  static postnobody(url) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      let _newToken = JSON.parse(token);
      axios({
        method: "post",
        url: `${API_URL}/${url}`,
        headers: {
          Authorization: _newToken,
          contentType: "multipart/form-data",
        },
      })
        .then(function (response) {
          resolve(response.data);
          console.log(response.data, "data");
        })
        .catch(function (error) {
          console.log(error, "error");
          reject(error);
        });
    });
  }
  static postrequestmultipart(url, body) {
    return new Promise(async (resolve, reject) => {
      let token = localStorage.getItem("token");
      let _newToken = JSON.parse(token);
      axios({
        method: "post",
        url: `${API_URL}/${url}`,
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
          contentType: "multipart/form-data",
        },
      })
        .then(function (response) {
          resolve(response.data);
          console.log(response.data, "data");
        })
        .catch(function (error) {
          console.log(error, "error");
          reject(error);
        });
    });
  }

  static put(url, body) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      let _newToken = JSON.parse(token);
      axios({
        method: "put",
        url: `${API_URL}/${url}`,
        data: body,
        headers: {
          Authorization: _newToken,
          contentType: "multipart/form-data",
        },
      })
        .then(function (response) {
          if (response.data && response.data.success) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(function (error) {
          console.log(error, "error");
          reject(error);
        });
    });
  }
  static delete(url, params) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      let _newToken = JSON.parse(token);
      axios({
        method: "delete",
        url: `${API_URL}/${url}`,
        headers: {
          Authorization: _newToken,
          contentType: "multipart/form-data",
        },
        params: params,
      })
        .then(function (response) {
          if (response.data && response.data.success) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(function (error) {
          console.log(error, "error");
          reject(error);
        });
    });
  }
  static deletewithbody(url, body) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("token");
      let _newToken = JSON.parse(token);
      axios({
        method: "delete",
        url: `${API_URL}/${url}`,
        data: body,
        headers: {
          Authorization: _newToken,
          contentType: "multipart/form-data",
        },
      })
        .then(function (response) {
          if (response.data && response.data.success) {
            resolve(response.data);
          } else {
            reject(response.data);
          }
        })
        .catch(function (error) {
          console.log(error, "error");
          reject(error);
        });
    });
  }
}
