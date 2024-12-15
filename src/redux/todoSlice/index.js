import {createSlice} from "@reduxjs/toolkit";

let initialState = {
	data: [],
};

let todoSlice = createSlice({
	name: "todo-list",
	initialState,
	reducers: {
		getData(state, {payload}) {
			state.data = [...state.data, {payload}];
		},
		deleteData(state, {payload}) {
			state.data = state.data.filter((value) => value.payload.id != payload);
		},
		editData(state, {payload}) {
			state.data = state.data.map((value) => {
				if (value.payload.id === payload.id) {
					value.payload.text.text = payload.text;
				}
				return value;
			});
		},
	},
});

export let {getData, deleteData, editData} = todoSlice.actions;
export default todoSlice.reducer;
