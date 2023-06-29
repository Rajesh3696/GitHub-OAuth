import { createSlice } from '@reduxjs/toolkit'
import { httpGet } from '../../utils/Rest'

const initialData = {
  isLoading: false,
  errorMsg: null,
  successMsg: null,
  repoData: {},
}

const slice = createSlice({
  name: 'login',
  initialState: {
    ...initialData,
  },
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true
      state.errorMsg = null
    },
    fetchRepoData: (state, action) => {
      state.repoData = action.payload
      state.errorMsg = null
    },
  },
})

export default slice.reducer
export const { fetchStart, fetchRepoData } = slice.actions
