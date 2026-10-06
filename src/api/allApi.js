import { commonAPI } from './axiosinstance'
import { SERVER_URL, API_KEY } from './apiservice'

export const searchMoviesAPI = async (title) => {
  return await commonAPI('GET', `${SERVER_URL}?s=${title}&apikey=${API_KEY}`, '')
}

export const getMovieDetailsAPI = async (imdbID) => {
  return await commonAPI('GET', `${SERVER_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`, '')
}