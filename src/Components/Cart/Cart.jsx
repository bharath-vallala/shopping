import React,{useState,useEffect} from 'react'
import {useFirestore} from "react-redux-firebase"
import {useSelector} from 'react-redux'
import "./Cart.Styles.css"



export default function Cart() {
    let firestore=useFirestore()
    const auth=useSelector((state) => state.firebase.auth)
    const [Cart, setCart] = useState([])
    const [Total, setTotal] = useState(0)
    const [ids,setIds]=useState([])

useEffect(()=>{
    getData();

},[])
useEffect(()=>{
    console.log(Cart)
},[Cart])

let getData=()=>{

    firestore
    .collection('users')
    .doc(auth.uid)
    .collection("cart")
    .get()
    .then(function (querySnapshot) {
        let tempCart=[]
        let Tids=[]
       let total=0
   
      querySnapshot.forEach(function (doc) {
          if(doc.exists){
              console.log(doc.id)
              Tids.push(doc.id);
              tempCart.push(doc.data())
              total=parseInt(doc.data().item.price)+total
          }else{
              console.log("no doc exists")
          }
          
        })
        setCart(tempCart)
        setTotal(total)
        setIds(Tids)
    })
    .catch(function (error) {
     
    })

}

let deleteItem=(index)=>{
    let id=ids[index]
    firestore
    .collection('users')
    .doc(auth.uid)
    .collection("cart").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        getData();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });

}

let renderitems=()=>{
  return  Cart.map((element,index)=>{
        
      return(
        <div className="flex-row mr1">
        <img className="cart-image" src={element.item.urls[0]}></img>
        <div className="flex-col" style={{alignItems:"flex-start"}}>
            <p className="item-label"><span>Name: </span>{element.item.name}</p>
            <p className="item-label"><span>Size: </span>{element.size}</p>
            <p className="item-label"><span>Price: </span>{element.item.price}</p>
            <p className="item-label"><span>Rating: </span>{element.item.rating}</p>
            <div className="button-primary" style={{marginLeft:"1rem", marginTop:"1rem"}}
            onClick={()=>{
                deleteItem(index)
            }}>
                <p>Remove</p>
            </div>

        </div>
    </div>

      )

    })
}

if(Cart.length>0){
    return (
        
        <div className="flec-col">
            
            <p className="heading">Your Cart ( {Cart.length} items )</p>
                <div className="flex-row fix-col colStuff">
                        {renderitems()}
                </div>
                <div className="flex-col">
                    <div className="flex-row amountCard w100" style={{}}>
                        <p className="small-bold">SUBTOTAL :</p>
                        <p className="small-bold">₹{Total}</p>
                    </div>
                    <div className="flex-row amountCard w100" style={{}}>
                        <p className="small-bold">SHIPPING :</p>
                        <p className="small-bold">₹{200}</p>
                    </div>
                    <div className="flex-row amountCard w100" style={{}}>
                        <p className="small-bold">TAX :</p>
                        <p className="small-bold">₹{150}</p>
                    </div>
                    <div className="flex-row amountCard w100" style={{}}>
                        <p className="small-bold">TOTAL :</p>
                        <p className="big">₹{Total+200+150}</p>
                    </div>
                    <div className="button-primary" style={{marginTop:"1rem"}}>
                        <p>CHECK OUT</p>
                    </div>
                </div>
            
            
        </div>
    )
}else{
   return <p>nothing to show</p>
}
    
}
