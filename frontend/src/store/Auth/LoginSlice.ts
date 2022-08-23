import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserLogin } from "../../components/helpers/interface/User";
import { alertToast } from "../../components/helpers/toast/Toast";

const API = "http://localhost:4000/graphql";
export const fetchAsyncLogin = createAsyncThunk(
  "login/fetchAsyncLogin",
  async (user: UserLogin) => {
    try {
      let { data } = await axios.post<UserLogin>(
        API,
        {
          query: `
                      query{
                        login(email:"${user.email}",password:"${user.password}"){
                          userId
                          token
                          tokenExpiration
                          email
                         
                        }
                      }
                    `,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (error: any) {
      let data = error;
      return data;
    }
  }
);

const initialState = {
  User: {
    userId: "",
    token: "",
    tokenExpiration: 0,
    email: "",
  } as User,
  isLoggedIn: false,
};
const LoginSlice = createSlice({
  name: "Login",
  initialState,
  reducers: {
    isLoggedIn: (state: any) => {
      state.isLoggedIn = localStorage.getItem("token") ? true : false;
    },
    logout: (state: any) => {
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.pending, (state) => {
      console.log("pending");
      return {
        ...state,
        isLoggedIn: false,
      };
    });
    builder.addCase(fetchAsyncLogin.fulfilled, (state, { payload }) => {
      if (payload.response) {
        if (payload.response.status === 500) {
          console.log(payload.response);
          alertToast("Email Or Password Is Incorrect");
        } else {
          alertToast("User Login Failed!!");
        }
      } else {
        console.log(payload.data);
        localStorage.setItem("token", payload.data.login.token);
        localStorage.setItem("userId", payload.data.login.userId);
        return {
          ...state,
          User: payload.data.login,
          isLoggedIn: true,
        };
      }
    });
    builder.addCase(fetchAsyncLogin.rejected, (state, { payload }) => {
      console.log("rejected");
      console.log(payload);
      return {
        ...state,
        isLoggedIn: false,
      };
    });
  },
});
export const { logout } = LoginSlice.actions;
export const userInfo = (state: { Login: { User: User } }) => state.Login.User;
export const isLoggedIn = (state: { Login: { isLoggedIn: boolean } }) =>
  state.Login.isLoggedIn;

export default LoginSlice.reducer;
