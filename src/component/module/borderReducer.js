const DATA_GET='DATA';
const MODE_SELET_ROW='SELECT_ROW';

export const boadeGet=(Data)=>({
    type:DATA_GET,
    Data
});
export const selectBoard=(boardId)=>({
    type:MODE_SELET_ROW,
    boardId:boardId
})


const initialState = {
    topics:[],
    selectRowData:{},
}


export default function borderReducer(state =initialState, action){
    switch(action.type){
        case DATA_GET:{
            console.log("?");
            return{
                ...state, 
                topics:action.Data
            } 
        }
        
        case MODE_SELET_ROW:{

            return{
                ...state,
                selectRowData:state.topics.find(ele=>ele.id===action.boardId)
            }
        }

        default:
         return state
    }
    
}
