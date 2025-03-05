import { createSlice } from "@reduxjs/toolkit";

const getSlice = createSlice({
    name: 'get',
    initialState: {
        showGptSearch: false
    },
    reducers:{
        toggleGptSearchView : (state) =>{
            state.showGptSearch = !state.showGptSearch;
        },
    }
});

export const { toggleGptSearchView } = getSlice.actions;

export default getSlice.reducer