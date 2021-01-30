import React, { useState, useEffect } from 'react'
import './navbar-styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {useHistory} from "react-router-dom"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { useFirebase } from 'react-redux-firebase'
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {selectedType} from "../../Redux/Reducers/actions"


function Navbar(props) {
  const firebase = useFirebase()
  const history=useHistory()
  const auth = useSelector((state) => state.firebase.auth)
  console.log(useSelector((state) => state))

  const signWIthGoogle = () => {
    firebase
      .login({
        provider: 'google',
        type: 'popup',
      })
      .then((res) => {
        // history.push("/home")
      })
  }

  let signinButton = () => {
    return (
      <div className="flex-row">
      <div className='button-primary' onClick={signWIthGoogle}>
        <p>SIGNIN</p>
      </div>
    </div>
    )
  }

   let logout=()=>{
    firebase.logout()
   }

  let userAvatar = () => {
    return (
      <div className="flex-row">
      <div className='flex-row' style={{cursor:"pointer"}} onClick={()=>{history.push("/cart")}}>
      <div style={{marginLeft:"0rem"}}>
      <FontAwesomeIcon  icon={faShoppingCart} size='2x'></FontAwesomeIcon></div>
     </div>
        <ul className="flex-row nav-links">
        <li> <img className="avatar" src={auth.photoURL}></img>
        </li>
        
      </ul>
      </div>
        
    )
  }

  return (
    <div className='navbar card-shadow'>
      <div className='flex-row'>
        <div style={{marginLeft:"2rem"}}>
        <FontAwesomeIcon  icon={faShoppingBag} size='2x'></FontAwesomeIcon></div>
      </div>
      <div>
        <ul className='flex-row nav-links'>
          <li>
            <a  onClick={()=>{
                  history.push("/")
            }} >Home</a>
          </li>
          <li>
            <a onClick={()=>{
                  props.selectedType("0")
                  history.push("/product")
            }}>Men</a>
          </li>
          <li>
            <a  onClick={()=>{
              props.selectedType("2")
              history.push("/product")
            }}>Women</a>
          </li>
        </ul>
      </div>
      <div>
        {!isLoaded(auth) ? (
          <span>Loading...</span>
        ) : isEmpty(auth) ? (
          // <GoogleButton/> button can be used instead
          signinButton()
        ) : (
          userAvatar()
        )}
      </div>
    </div>
  )
}
const mapStatetoProps=(state,ownProps)=>{
  
  return ({type:state.type})

}

export default withRouter(connect(mapStatetoProps,{selectedType}) (Navbar))

