import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import AdminPanel from './components/admin/admin';

import './App.css';

export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
      bigObj:{},
      changedContent:{}
    }
  }


componentDidMount(){


  let bigObj = {}

  const elements = document.body.getElementsByTagName("*");
  let count = 0;
  
  for(let i = 0; i < elements.length; i++) {
     let current = elements[i];
      if(current.children.length === 0 && current.textContent.replace(/ |\n/g,'') !== '') {
         
         current.setAttribute("id",`forTranslate_${count}`)
         bigObj[current.id] = current.textContent
         count+=1
        }
  }

// console.log(document.querySelectorAll('p')[0].childNodes.length===document.querySelectorAll('p')[0].children.length)
// console.log(typeof document.querySelectorAll('p')[0].childNodes)
// let arr=[]
// for(let[key,val] of Object.entries( document.querySelectorAll('p')[0].childNodes)){
//   if(val.length!==undefined){
//     arr.push(val.textContent)
//   }
//   else{
//     arr.push("tag")
//   }
// }
// console.log(arr.join(' '))
delete bigObj.forTranslate_0

  this.setState({
    bigObj
  })

  fetch('/sendArmenianData',{
    method:"POST",
    headers:new Headers({"Content-type":"application/json"}),
    body:JSON.stringify(bigObj)
  })
}

handleChangeEnglish=()=>{
  fetch('/getEnglishData').then(res=>res.json()).then(data=>{
    for(let [key,val] of Object.entries(data)){
      document.getElementById(key).innerHTML = val
    }
  })
}

handleChangeRussian=()=>{
  fetch('/getRussianData').then(res=>res.json()).then(data=>{
    for(let [key,val] of Object.entries(data)){
      document.getElementById(key).innerHTML = val
    }
  })
}




  render() {
    return (
      <div>
        <Router>
        <Route path="/main">

        <p>Հայերեն</p>
        <ul>
          
          <li>Հայերեն տեքստ</li>
          <li>Ուրիշ տեքստ</li>

        </ul>
        <Link to="admin"><button className="btn btn-success">Գնալ ադմին պանել</button></Link>
        <button className="btn btn-success" onClick={()=>{this.handleChangeRussian()}} style={{marginLeft:"20px",marginRight:"20px"}}>Թարգմանել ռուսերեն</button>
        <button className="btn btn-success" onClick={()=>{this.handleChangeEnglish()}}>Թարգմանել անգլերեն</button>

        </Route>
        


          <Route path='/admin'>
            <AdminPanel bigObj={this.state.bigObj}/>
          </Route>
        </Router>

      </div>
    )



  }
}

