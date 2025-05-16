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

export const getPublicacion = async (data) => {
    try {
        return await apiClient.post('publicacion/', data)
    } catch (e) {
        return { error: true, e }
    }
}

export const getCommit = async (data) => {
    try {
        return await apiClient.post('commit/', data)
    } catch (e) {
        return { error: true, e }
    }
}
const checkResponseStatus = (e) => {
  const responseStatus = e?.response.status;
  if (responseStatus) {
    (responseStatus === 401 || responseStatus === 403) && logout();
  }
};