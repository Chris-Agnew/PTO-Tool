import { configureStore } from '@reduxjs/toolkit'
import daysOffReducer from '../features/days/daysSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    day: daysOffReducer,
    user: userReducer,
  },
})
