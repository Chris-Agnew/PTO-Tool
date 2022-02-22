import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  days: [],
}

const daysSlice = createSlice({
  name: 'day',
  initialState,
  reducers: {
    setDaysOff: (state, action) => {
      state.days = action.payload
    },
  },
})

export const { setDaysOff } = daysSlice.actions

export const selectDays = (state: any) => state.day.days

export default daysSlice.reducer
