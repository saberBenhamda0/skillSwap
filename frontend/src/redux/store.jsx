import { configureStore } from "@reduxjs/toolkit";
import { api } from './reducers/apiReducer'; // Ensure this is correctly set up
import postsReducer from "./reducers/postsReducer"; // Ensure this reducer is correctly set up
import authReducer from "./reducers/authReducer";
import storage from 'redux-persist/lib/storage'
import userInfoReducer from "./reducers/userInfoReducer";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
  }

const persistedReducer1 = persistReducer(persistConfig, authReducer)
const persistedReducer2 = persistReducer(persistConfig, userInfoReducer)


const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer, // Dynamically add API reducer
        posts: postsReducer,
        auth: persistedReducer1,
        userInfo:persistedReducer2,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});


export const persistor = persistStore(store)

export default store;
