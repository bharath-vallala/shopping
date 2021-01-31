import React,{useEffect} from 'react'
import "./show-casestyles.css"
import "../styles/universal-styles.css"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {selectedType} from "../../Redux/Reducers/actions"
import { useHistory } from "react-router-dom";
import Images from "../UploadImage"

function ShowCase(props) {
    const history = useHistory();

    

    let urls=[
        "https://firebasestorage.googleapis.com/v0/b/shopping-da1fd.appspot.com/o/covers%2Fshirt1.webp?alt=media&token=50ed1040-8ce5-4638-a33e-4edadec09f8b",
        "https://firebasestorage.googleapis.com/v0/b/shopping-da1fd.appspot.com/o/covers%2Fpant2.webp?alt=media&token=02e1f800-b4fc-4f95-a927-4aadcfbd5820",
        "https://firebasestorage.googleapis.com/v0/b/shopping-da1fd.appspot.com/o/covers%2Fkurtha1.webp?alt=media&token=79cda645-c339-4724-9416-2564db8b647a",
        "https://firebasestorage.googleapis.com/v0/b/shopping-da1fd.appspot.com/o/covers%2Fdress2.webp?alt=media&token=a3327fc0-d135-469e-8229-8cd5e6f34dab",
        "https://firebasestorage.googleapis.com/v0/b/shopping-da1fd.appspot.com/o/covers%2Fkurtha2.webp?alt=media&token=2f8e623a-1760-40fd-9410-b69ec8c55ed8",
        "https://firebasestorage.googleapis.com/v0/b/shopping-da1fd.appspot.com/o/covers%2Fshirt2.webp?alt=media&token=1796ec76-c91a-4b5f-affa-6a65699a4f81",
        "https://firebasestorage.googleapis.com/v0/b/shopping-da1fd.appspot.com/o/covers%2Fjeans2.webp?alt=media&token=cae34552-4de0-47a1-8588-353a5b274a6e"
        
    ]

    useEffect(() => {
        console.log('New value', props.type) 
        return () => {
           console.log('Prev value', props.type) 
           //history.push("/product")

        }
   
      }, [props.type])
    
    return (
        <div className="flex-col">
            <div className="grid-cont">
                <div className="grid-item" onClick={()=>{
                    props.selectedType("0")
                    history.push({ 
                        pathname: '/product',
                        state: "0"
                       })
                }}>
                    <img className="image2" src={urls[0]}></img>
                    <div className="center">
                        <p>SHIRTS</p>
                    </div>
                </div>
                <div className="grid-item" onClick={()=>{
                    history.push({ 
                        pathname: '/product',
                        state: "1"
                       })
                }}>
                    <img className="image2" src={urls[1]}></img>
                    <div className="center">
                        <p>JEANS</p>
                    </div>
                </div>
                <div className="grid-item" onClick={()=>{
                    history.push({ 
                        pathname: '/product',
                        state: "2"
                       })
                }}>
                    <img className="image2" src={urls[2]}></img>
                    <div className="center">
                        <p>KURTHAS</p>
                    </div>
                </div>
                <div className="grid-item" onClick={()=>{
                    history.push({ 
                        pathname: '/product',
                        state: "3"
                       })
                }}>
                    <img className="image2" src={urls[3]}></img>
                    <div className="center">
                        <p>DRESSES</p>
                    </div>
                </div>
            </div>
           

            
        </div>
    )
}

const mapStatetoProps=(state,ownProps)=>{
  
    return ({type:state.type})

}

export default withRouter(connect(mapStatetoProps,{selectedType}) (ShowCase))
