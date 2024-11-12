const getUser = () => {
  fetch("https://reqres.in/api/users/1")
    .then((response) => response.json())
    .then((data) => {
      let user = data.data;
      console.log(user);
      console.log(user.id);
      console.log(user.first_name);
      console.log(user.last_name);
      console.log(user.email);
      console.log(user.avatar);
    });
};

const getUserWithErrorHandling = () => {
  fetch("https://reqres.in/api/users/x")
    .then((response) => {
      //   console.log(response.status);
      //   console.log(response.ok);
      if (!response.ok) {
        throw new Error("Terjadi gangguan");
      }
      return response.json();
    })
    .then((data) => console.log(data.data))
    .catch((error) => {
      console.log(error);
    });
};

const getUserWithAsyncAwait = async () => {
  let response = await fetch("https://reqres.in/api/users/1");
  let data = await response.json();
  let user = data.data;

  console.log(user.id);
  console.log(user.first_name);
  console.log(user.last_name);
  console.log(user.email);
  console.log(user.avatar);
};

const getUserWithErrorHandlingAsyncAwait = async () => {
  let response = await fetch("https://reqres.in/apis/users/1");
  if (!response.ok) {
    throw new Error(`Terjadi gangguan dengan kode: ${response.status}`);
  }
  let data = await response.json();
  let user = data.data;

  console.log(user.id);
  console.log(user.first_name);
  console.log(user.last_name);
  console.log(user.email);
  console.log(user.avatar);
};

const getUserWithTryCatch = async () => {
  try {
    let response = await fetch("https://reqres.in/apis/users/107");
    if (!response.ok) {
      throw new Error(`Terjadi gangguan dengan kode: ${response.status}`);
    }
    let data = await response.json();
    let user = data.data;

    console.log(user.id);
    console.log(user.first_name);
    console.log(user.last_name);
    console.log(user.email);
    console.log(user.avatar);
  } catch (error) {
    console.log(error);
  }
};

// POST Request
const user = {
  first_name: "Name",
  last_name: "Test",
  email: "name.test@gmail.com",
};

const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(user),
};

const postUser = () => {
  fetch("https://reqres.in/api/users", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.id);
      console.log(data.first_name);
      console.log(data.last_name);
      console.log(data.email);
    });
};

// PUT Request
const userPut = {
  first_name: "Farhan",
  last_name: "Athaullah",
  email: "farhan@gmail.com",
  address: "Jl. Jalan",
};

const requestOptionsPut = {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(userPut),
};

const putUser = (id) => {
  fetch(`https://reqres.in/api/users/${id}`, requestOptionsPut)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
};

// DELETE Request
const deleteUser = (id) => {
  fetch(`https://reqres.in/api/users/${id}`, { method: "DELETE" }).then(
    (response) => console.log(response)
  );
};

// getUser();
// getUserWithErrorHandling();
// getUserWithAsyncAwait();
// getUserWithErrorHandlingAsyncAwait().catch((errror) => console.log(errror));
// getUserWithTryCatch();

// postUser();
// putUser(1);
deleteUser(1);
