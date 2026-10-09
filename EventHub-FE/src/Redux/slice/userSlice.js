import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    user: null

}

const userSlice = createSlice({

    name: "user",

    initialState,

    reducers: {

        login: (prevState, {payload}) => {

            return {

                ...prevState,

                user: payload

            }

        },

        editProfile: (prevState, {payload}) => {
            return{
                user: {
                    ...prevState.user,
                    ...payload
                }
            }
        },

        addCart: (prevState, {payload}) => {

            const isRegistered = prevState.user.cart.some(
                (item) => item.id === payload.id
            )

            if(isRegistered){
                return prevState
            }

            return {

                ...prevState,

                user: {

                    ...prevState.user,

                    cart: [
                        ...prevState.user.cart,
                        payload
                    ]

                }

            }

        },

        removeCart: (prevState, {payload}) => {

            return {

                ...prevState,

                user: {

                    ...prevState.user,

                    cart: prevState.user.cart.filter(
                        (item) => item.id !== payload
                    )

                }

            }

        },

        logout: (prevState) => {

            return {

                ...prevState,

                user: null

            }

        }

    }

})

export const {

    login,
    editProfile,
    addCart,
    removeCart,
    logout

} = userSlice.actions

export default userSlice.reducer