import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setSelectedProduct } from '../../Redux/Reducers/actions'
import Slider from 'infinite-react-carousel'
import "./productSingle.style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import {useFirestore} from "react-redux-firebase"
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'



function ProductSingleView(props) {
  const [quantity, setquantity] = useState(1)
  const [size,setSize]=useState("L")
  const [Done, setDone] = useState(false)
  const auth = useSelector((state) => state.firebase.auth)

  let firestore=useFirestore()
  let history=useHistory()

  

 let  renderImages = () => {
     
     if(props.product.urls){
        return props.product.urls.map((url) => {
            return (
              <div>
                <img className="productImageSIngle" src={url}></img>
              </div>
            )
          })
     }else{
         return history.push("/")
     }
   
  }

  let addTOCart=()=>{
    let data={
      item:props.product,
      size:size,
      quantity:quantity
    }
    firestore.collection("users").doc(auth.uid).collection("cart").add(data).
    then(()=>{
    console.log("done")
    setDone(true)
    setTimeout(()=>{
      setDone(false)
    },2000)
    }
    ).catch(e=>{console.log(e)})
  }

  return (
    <div>
      {!isLoaded(auth) ? (
          <span>Loading...</span>
        ) : isEmpty(auth) ? (
          
          <div className="modalLogin">
        <p>please Login to add item to cart</p>
      </div>
        ) : (
          null
        )}
      
        <Slider {...{
      arrows: false, slidesPerRow: 2
    }} dots>{renderImages()}</Slider>
    <div className="flex-col" >
      <p className="big-heading">{props.product.name}</p>
      <p  className="desc">Price <span className="sub-heading">₹ {props.product.price}</span>  </p>
      <p  className="desc">Product Description</p>
      <p className="sub-heading">{props.product.description}</p>
    </div>
    <div className="flex-row mr3">
      <div className="flex-row mr1">
        <p  className="desc" style={{paddingRight:"0.8rem"}}>Quantity :</p>
          <div onClick={()=>{
              console.log(quantity)
              setquantity(quantity+1)
            }}>
            <FontAwesomeIcon style={{marginRight:"0.8rem"}}  icon={faAngleUp}  size={'2x'}></FontAwesomeIcon>
          </div>
          <input className="quant-imp" value={quantity} ></input>
          <div onClick={()=>{
              if(quantity>0){
                setquantity(quantity-1)
              }
            
            }}>
            <FontAwesomeIcon icon={faAngleDown} size={'2x'} ></FontAwesomeIcon>
          </div>

      </div>
    </div>
    <div className="flex-row mr1">
    <p  className="desc" style={{paddingRight:"0.2rem"}}>Size:</p>
        <div className="size-box" onClick={()=>{setSize("S")}}>
          <p>S</p>
        </div>
        <div className="size-box" onClick={()=>{setSize("M")}}>
          <p>M</p>
        </div>
        <div className="size-box" onClick={()=>{setSize("L")}}>
          <p>L</p>
        </div>
        <div className="size-box">
          <p>{size} <span><FontAwesomeIcon style={{marginRight:"0.8rem"}}  icon={faCheck} color="green"  size={'1x'}></FontAwesomeIcon></span> </p>
        </div>
      </div>
      {
        Done ? 
        <div className="modalDOne">
          <p>ADDED TO CART</p>
        </div>
      :
      null
      }
      <div className="flex-row" style={{padding:"1rem"}}>
        <div className={`button-primary ${isEmpty(auth) ? "disable" : ""}`}  style={{width:"10rem"}}
          onClick={addTOCart}
        >
          <p>add to cart</p>
        </div>
      </div>
      
      
      
      
  
      


      
    </div>
  )
}

const mapStatetoProps = (state, ownProps) => {
  return { product: state.selectedProduct }
}

export default withRouter(
  connect(mapStatetoProps, { setSelectedProduct })(ProductSingleView)
)
