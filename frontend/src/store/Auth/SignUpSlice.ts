import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserSignUp } from "../../components/helpers/interface/User";
import { alertToast, succesToast } from "../../components/helpers/toast/Toast";

const API = "http://localhost:4000/graphql";
export const fetchAsyncSignUp = createAsyncThunk(
  "signUp/fetchAsyncSignUp",
  async (user: UserSignUp) => {
    const { email, password } = user;
    const { data } = await axios.post<UserSignUp>(
      API,
      {
        query: `
                  mutation{
                      createUser(userInput:{email:"${email}",password:"${password}"}){
                          _id
                          email
                      }
                  }
              `,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return data;
  }
);
export const fetchAsyncFoundEmail = createAsyncThunk(
  "signUp/fetchAsyncFoundEmail",
  async (email: string) => {
    let { data } = await axios.post<UserSignUp>(
      API,
      {
        query: `
      query{
        emailCheck(email:"${email}"){
          found
        }
              }
          `,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    return data;
  }
);

const initialState = {
  User: {
    email: "",
    password: "",
    confirmPassword: "",
    found: false,
    error: false,
  } as UserSignUp,
};

const SignUpSlice = createSlice({
  name: "SignUp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncFoundEmail.pending, () => {
      console.log("finding email");
    });
    builder.addCase(fetchAsyncFoundEmail.fulfilled, (state, { payload }) => {
      return {
        ...state,
        found: payload.data?.emailCheck?.found,
      };
    });
    builder.addCase(fetchAsyncFoundEmail.rejected, () => {
      console.log("rejected");
    });
    //end of checking for repeated emails
    builder.addCase(fetchAsyncSignUp.pending, () => {
      console.log("signing up pending");
    });
    builder.addCase(fetchAsyncSignUp.fulfilled, (state, { payload }) => {
      console.log("fullfiled", payload);
      if (payload.errors![0].message !==undefined) {
        alertToast(payload.errors![0].message);
        return {
          ...state,
          error: true,
        };
      } else if(payload.errors![0].message ===undefined) {
        succesToast("Successfully Created User!");
       console.log(payload);
       return {
        ...state,
        error: false,
      };
      }
    });
    builder.addCase(fetchAsyncSignUp.rejected, () => {
      console.log("rejected");
      alertToast("User Sign Up Failed");
    });
  },
});
export const getEmailFound = (state: { SignUp: { found: boolean } }) =>
  state.SignUp.found;

export default SignUpSlice.reducer;
