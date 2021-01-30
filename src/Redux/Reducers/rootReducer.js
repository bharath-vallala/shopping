import {firebaseReducer
} from 'react-redux-firebase'
import {firestoreReducer } from 'redux-firestore'
import { createStore, combineReducers, compose,applyMiddleware } from 'redux'


const TypeR=(state=0,action)=>{
    switch(action.type){
        case "TYPEE" :
            return action.payload
        default :
            return state
    }

}
const currentProductsR=(state=[],action)=>{
    switch(action.type){
        case "PRODUSTCC" :
            return action.payload
        default :
            return state
    }

}
const setSelectedProductR=(state={},action)=>{
    switch(action.type){
        case "SELECTED-PRODUCT" :
            return action.payload
        default :
            return state
    }

}

const rootReducer = combineReducers({
    firebase:firebaseReducer,
    firestore: firestoreReducer, // <- needed if using firestore,
    type:TypeR,
    currentProducts:currentProductsR,
    selectedProduct:setSelectedProductR
  
})

export default rootReducer