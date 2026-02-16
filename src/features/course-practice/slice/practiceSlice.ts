import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface practiceState{
  unitId: number
}

const initialState: practiceState = {
  unitId: 0,
}

export const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    handleUnit: (state, action: PayloadAction<number>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action.payload);
      state.unitId = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { handleUnit } = practiceSlice.actions

export default practiceSlice.reducer