const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name:'cart',
    initialState: [],
    reducers: {
        addProduct: {
            reducer: (state, action) => {
                state.push(action.payload);
            },
            prepare: (product, amount) => {
                return {
                    payload: {
                        id: product.id,
                        product,
                        amount
                    }
                };
            }
        },
        updateProduct: (state, action) => {
            state.find((val) => val.id === action.payload.id).amount = action.payload.amount;
        },
        removeProduct: (state, action) => {
            state.splice(state.findIndex((val) => val.id === action.payload.id), 1);
        },
        clearProducts: (state) => {
            return [];
        }
    }
})

export const {addProduct, updateProduct, removeProduct, clearProducts} = cartSlice.actions;

export const getListOfProducts = (state) => state.cart;

export const checkPresenseOnCart = (id) => state => {
    let res = state.cart.find((val) => val.id === id);
    return res !== undefined;
}

export default cartSlice.reducer;
