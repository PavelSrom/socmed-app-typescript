import axios from 'axios'
import { Dispatch } from '..'
import { setAlert } from './visual'

export const createNewPost = (form: any) => async (dispatch: Dispatch) => {
  const allowedFormats = ['.png', '.jpg', '.jpeg']
  if (form.image) {
    for (let format of allowedFormats) {
      if (!form.image.name.endsWith(format)) {
        return dispatch(setAlert('Not an image', 'error'))
      }
    }
  }

  const fd = new FormData()
  for (let key of Object.keys(form)) {
    fd.append(key, form[key])
  }

  try {
    const res = await axios.post('/api/posts', fd)
    dispatch({ type: 'CREATE_NEW_POST', payload: res.data })
    dispatch(setAlert('Post created successfully', 'success'))
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, 'error'))
  }
}

export const getPosts = () => async (dispatch: Dispatch) => {
  try {
    const res = await axios.get('/api/posts')
    dispatch({ type: 'GET_POSTS', payload: res.data })
  } catch ({ message }) {
    dispatch(setAlert('Failed to fetch posts', 'error'))
  }
}

export const addLike = (postID: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.post(`/api/posts/${postID}/like`)
    dispatch({ type: 'UPDATE_POST', payload: res.data })
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, 'error'))
  }
}

export const removeLike = (postID: string) => async (dispatch: Dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postID}/like`)
    dispatch({ type: 'UPDATE_POST', payload: res.data })
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, 'error'))
  }
}

export const addComment = (postID: string, text: string) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await axios.post(`/api/posts/${postID}/comment`, { text })
    dispatch({ type: 'UPDATE_POST', payload: res.data })
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, 'error'))
  }
}

export const removeComment = (postID: string, commentID: string) => async (
  dispatch: Dispatch
) => {
  try {
    const res = await axios.delete(`/api/posts/${postID}/${commentID}`)
    dispatch({ type: 'UPDATE_POST', payload: res.data })
  } catch ({ response }) {
    dispatch(setAlert(response.data.message, 'error'))
  }
}
