


import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import 'firebase/storage';

class UploadImage extends Component {
     storage = firebase.storage();
     firestore=firebase.firestore()

     constructor(props) {
        super(props)
    
        this.state = {
            name: '',
            description: '',
            rating:'',
            type:"",
            price:"",
            discount:"",
            files:[],
            urls:[]
        };
      };
      handleChange=(e, name)=>{
        this.setState({ [name]: e.target.value });

      }
        onSubmit=async (e)=>{
          e.preventDefault()
          console.log(this.state.name)
          const files = this.state.files;
          //var storageRef = firebase.storage().ref("covers")

     await  Object.keys(files).map((key)=>{
              console.log(files[key].name)
              
              this.storage
              .ref( `/products/${files[key].name}` ).put(files[key])
             
              .then(snapshot => {
                return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
            })
         
            .then(downloadURL => {
               //console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
               let urls=[...this.state.urls]
               urls.push(downloadURL)
               this.setState({urls:urls},()=>{
                   //console.log(this.state.urls)
               });
               return downloadURL;
            }).then(urls=>{
                console.log(urls)
            })
         
            .catch(error => {
               // Use to signal error if something goes wrong.
               console.log(`Failed to upload file and get link - ${error}`);
            });
        
          })
          
          setTimeout(()=>{ 
              let data={
                name: this.state.name,
                description:this.state.description,
                rating:this.state.rating,
                type:this.state.type,
                price:this.state.price,
                discount:this.state.discount,
                urls:this.state.urls
              }
              
            this.firestore.collection("products").doc("women").collection("dresses").add(data).
            then(()=>{
            console.log("done")
            this.setState({urls:[]})
            }
            ).catch(e=>{console.log(e)})


          }, 10000);

          
           /* files.map( filename => {
                this.storage
                .ref( `/covers/${filename}` )
                .getDownloadURL()
                .then( url => {
                    console.log( "Got download url: ", url );
                });
            });*/
      }
    

    render() {
    return (
        <div>
            <form action="/action_page.php">
            <label for="name">name</label>
            <input name="name" type="text" onChange={ (e) => this.handleChange(e, 'name') }></input>

            <label for="desc">desc</label>
            <input name="desc" type="text" onChange={ (e) => this.handleChange(e, 'description') } ></input>

            <label for="rating">rating</label>
            <input name="rating" type="text" onChange={ (e) => this.handleChange(e, 'rating') }></input>

            <label for="type">type</label>
            <input name="type" type="text" onChange={ (e) => this.handleChange(e, 'type') }></input>

            <label for="price">price</label>
            <input name="price" type="text" onChange={ (e) => this.handleChange(e, 'price') }></input>

            <label for="discount">discount</label>
            <input name="discount" type="text" onChange={ (e) => this.handleChange(e, 'discount') }></input>

                <label for="files">Select files:</label>
                <input type="file" id="files" name="files" multiple onChange={(e)=>{
                    this.setState({files:e.target.files})
                    
                }} /><br></br>
                <input type="submit" onClick={this.onSubmit} />
                </form>
        </div>
    )
}
}

export default UploadImage;