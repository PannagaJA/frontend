const BASE_URL = "http://127.0.0.1:8000";

export const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

export const getStudents = async (token) => {
  const response = await fetch(`${BASE_URL}/api/students/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    // Token missing or expired
    return null;
  }

  return response.json();
};


export const createStudent = async (student, token) => {
  await fetch(`${BASE_URL}/api/students/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(student),
  });
};

export const updateStudent = async (id, student, token) => {
  await fetch(`${BASE_URL}/api/students/update/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(student),
  });
};

export const deleteStudent = async (id, token) => {
  await fetch(`${BASE_URL}/api/students/delete/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
