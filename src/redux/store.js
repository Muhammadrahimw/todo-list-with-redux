import {configureStore} from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

export let store = configureStore({
	reducer: {
		todoSlice,
	},
});
