const baseUrl = process.env.REACT_APP_USER_API_URL + "/users";

export const getUsers = () => {
  return fetch(baseUrl).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Bad network response");
    }
  });
};

export const deleteUser = id => {
  return fetch(`${baseUrl}/${id}`, { method: "DELETE" }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Bad network response");
    }
  });
};

export const addUser = user => {
  return fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "content-type": "application/json"
    }
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Bad network response");
    }
  });
};
