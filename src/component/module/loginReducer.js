const SET_USER='SET_USER';

export const setUser=(isLogin)=>({
    type:SET_USER,
    user:isLogin
})

const initialState={
    user:null
}

export default function loginReducer(state=initialState, action) {
    switch(action.type){
        case SET_USER:{
            return{
                ...state,
                user:action.user
            } 
        }

        default:
            return state
    }
}