import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: string;
}

interface BackendUser {
  id: number;
  uid: string | null;
  email: string;
  displayName: string | null;
  picture: string | null;
  provider: string | null;
  firstName: string | null;
  lastName: string | null;
  roleId: string | null;
  orgCode: string | null;
}

interface FirebaseAuthState {
  user: FirebaseUser | null;
  backendUser: BackendUser | null;
  idToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialState: FirebaseAuthState = {
  user: null,
  backendUser: null,
  idToken: null,
  isLoading: true,
  isAuthenticated: false,
};

const firebaseAuthSlice = createSlice({
  name: "firebaseAuth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setBackendUser: (state, action: PayloadAction<BackendUser | null>) => {
      state.backendUser = action.payload;
    },
    setIdToken: (state, action: PayloadAction<string | null>) => {
      state.idToken = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.backendUser = null;
      state.idToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { setUser, setBackendUser, setIdToken, setLoading, clearAuth } =
  firebaseAuthSlice.actions;

export type { FirebaseUser, BackendUser };

export default firebaseAuthSlice.reducer;

