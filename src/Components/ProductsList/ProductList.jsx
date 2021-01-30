import React,{useEffect,useState} from 'react'
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {useFirestore} from "react-redux-firebase"
import {setCurrentProducts} from '../../Redux/Reducers/actions'
import {setSelectedProduct} from '../../Redux/Reducers/actions'
import { useHistory } from "react-router-dom";
import "./productLIst.styles.css"
 function ProductList(props) {
    let firestore=useFirestore()
    let history=useHistory()
    let [gender,setGender]= useState("")
    let [type,setType]=useState("");

     useEffect(()=>{
         
         switch (props.type) {
             case "0":
                setGender("Mens")
                setType("shirts")
                 break;
            case "1":
                setGender("Mens")
                setType("jeans")
                 break;
            case "2":
                setGender("women")
                setType("kurthas")
                 break;
            case "3":
                setGender("women")
                setType("dresses")
             default:
                 break;
         }
         console.log("dude")
        
     
     },[props.type])

     useEffect(()=>{

        console.log(gender,type)
        if(gender!=""&type!=""){
            firestore
            .collection('products')
            .doc(gender)
            .collection(type)
            .get()
            .then(function (querySnapshot) {
                let tempProcucts=[]
            
    
            querySnapshot.forEach(function (doc) {
                if(doc.exists){
                    //console.log(doc.data())
                    tempProcucts.push(doc.data())
                }else{
                    console.log("no doc exists")
                }
                
                })
                props.setCurrentProducts(tempProcucts)
            })
            .catch(function (error) {
            
            })
    }
     },[gender,type])

    

    let renderCards=()=>{
        console.log(props.currentProducts)
        if (props.currentProducts.length>0) {
            return props.currentProducts.map((product) => {
              return (
                <div className="grid-item-product" onClick={()=>{
                    props.setSelectedProduct(product)
                    history.push("/singleProduct")

                    
                }}>
                    <img className="productImage" src={product.urls[0]}></img>
                    <p className="medium-label">{product.name}</p>
                    <p className="medium-label">₹ {product.price}</p>

                </div>
              )
            })
          }
          return <div className='heading-B'>no records found</div>
     }
    return (
        <div className="grid-col">
            
            <div className="product-grid">
                    {renderCards()}
            </div>
            
        </div>
    )
}

const mapStatetoProps=(state,ownProps)=>{
  
    return ({type:state.type, currentProducts:state.currentProducts})

}

export default withRouter(connect(mapStatetoProps,{setCurrentProducts,setSelectedProduct}) (ProductList))
