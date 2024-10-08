const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/hoots`;

async function index() {
  try {
    const response = await fetch(BASE_URL, {
      // this is how we send the token to the server when we make the http request
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, " <- err in index hootsService");
  }
}

async function show(hootId) {
  try {
    const response = await fetch(`${BASE_URL}/${hootId}`, {
      // this is how we send the token to the server to identify who we are
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, " <- err in show hootService");
  }
}

async function create(hootFormData) {
  console.log(hootFormData, " <-- in service create function");
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // when we send data to the server we have to tell the server
        // what type of data we are sending!
        "Content-Type": "application/json",
      },
      // body is where we put the data we are sending to the server
      // we have to package up the data into a json
      // hootFormData must be an object, json has to be an object!
      body: JSON.stringify(hootFormData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, " <- err in create hootService");
  }
}

async function createComment(hootId, commentFormData) {
  try {
    const response = await fetch(`${BASE_URL}/${hootId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // when we send data to the server we have to tell the server
        // what type of data we are sending!
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentFormData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, " <- err in createComment");
  }
}

export { index, show, create, createComment };
