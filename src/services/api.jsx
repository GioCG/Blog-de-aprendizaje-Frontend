import axios from "axios";
import { logout } from "../shared/hooks";

  const apiClient = axios.create({
      baseURL: 'http://localhost:3000/BlogAprendizaje/v1/',
      timeout: 5000
  })

  apiClient.interceptors.request.use(
    (config) => {
      const useUserDetails = localStorage.getItem('user');

      if (useUserDetails) {
        const token = JSON.parse(useUserDetails).token;
        config.headers['x-token'] = token; 
      }

      return config;
    },
    (e) => {
      return Promise.reject(e);
    }
  );

export const login = async (data) => {
    try {
        return await apiClient.post('auth/login', data)
    } catch (e) {
        return { error: true, e }
    }
}

export const register = async (data) => {
    try {
        return await apiClient.post('auth/register', data)
    } catch (e) {
        return { error: true, e }
    }
}

export const getPublicacionesByCategory = async (categoriaNombre) => {
  try {
    const response = await apiClient.get(`/publicacion/${categoriaNombre}`);
    return { data: response.data };
  } catch (error) {
    return { error };
  }
};

export const createCommit = async (data) => {
  try {
    const response = await apiClient.post("/commit/", data);
    return response.data;
  } catch (error) {
    return { error: true, message: error.response?.data?.message || "Error al crear commit" };
  }
};
export const deleteCommit = async (id) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  try {
    const response = await apiClient.delete(`/commits/${id}`, {
      headers: {
        'x-token': token,
      },
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.msg || "Error al eliminar el commit",
    };
  }
};


export const editCommit = async (id, textoprincipal) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  try {
    const response = await apiClient.put(`/commits/${id}`, 
      { textoprincipal },
      {
        headers: {
          'x-token': token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.msg || "Error al editar el commit",
    };
  }
};



export const getCommitsByUsername = async (username) => {
    try {
    const response = await apiClient.get(`/commit/${username}`);
    return { data: response.data };
  } catch (error) {
    return { error };
  }
};
const checkResponseStatus = (e) => {
  const responseStatus = e?.response.status;
  if (responseStatus) {
    (responseStatus === 401 || responseStatus === 403) && logout();
  }
};