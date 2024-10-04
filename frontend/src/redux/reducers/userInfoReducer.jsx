import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user_id : "",
    username: "",
    userDescription: "",
    pastCollaboration: "",
    User_image: "",
    bio:"",
    first_name:"",
    last_name:"",
    country:"",
    region:"",
    city:"",
    Neighborhood:"",
};

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {

            if (action.payload.user_id) {
                state.user_id = action.payload.user_id;

            }
            if (action.payload.bio) {
                state.bio = action.payload.bio;

            }

            if (action.payload.coutry) {
                state.coutry = action.payload.coutry;

            }

            if (action.payload.region) {
                state.region = action.payload.region;

            }

            if (action.payload.city) {
                state.city = action.payload.city;

            }

            if (action.payload.Neighborhood) {
                state.Neighborhood = action.payload.Neighborhood;

            }



            if (action.payload.first_name) {
                state.first_name = action.payload.first_name;

            }
            if (action.payload.second_name) {
                state.last_name = action.payload.last_name;

            }

            if (action.payload.username) {
                state.username = action.payload.username;

            }

            if (action.payload.userDescription) {
                state.userDescription = action.payload.userDescription;
            }

            if (action.payload.pastCollaboration) {
                state.pastCollaboration = action.payload.pastCollaboration;
            }

            if (action.payload.User_image) {
                state.User_image = action.payload.User_image;
            }

        }
    }
});


export const { setUserInfo } = userInfoSlice.actions; 
export default userInfoSlice.reducer;
