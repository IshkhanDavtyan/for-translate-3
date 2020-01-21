import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class AdminPanel extends Component {



    handleSendEnglishData=(contentObj)=>{
        console.log(contentObj)

        let translateObj = {}
        let count = 0
        for(let [key,val] of Object.entries(contentObj)){
            let inputValue = document.querySelectorAll('input')[count].value
            count+=1
            translateObj[key] = inputValue
        }
        fetch('/sendEnglishData',{
            method:"POST",
            headers:new Headers({"Content-type":"application/json"}),
            body:JSON.stringify(translateObj)
          })
     
    }

    handleSendRussianData=(contentObj)=>{
        let translateObj = {}
        let count = 0
        for(let [key,val] of Object.entries(contentObj)){
            let inputValue = document.querySelectorAll('input')[count].value
            count+=1
            translateObj[key] = inputValue
        }

        fetch('/sendRussianData',{
            method:"POST",
            headers:new Headers({"Content-type":"application/json"}),
            body:JSON.stringify(translateObj)
          })
    }

    render() {

        const texts = this.props.bigObj
        const adminPanelContent = [];

        for(let [key,val] of Object.entries(texts)){
            adminPanelContent.push(
                <div className="input-group input-group-sm mb-3" key={key}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">{val}</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
            )
        }

            
        
        



        return (
            <div>
                {adminPanelContent}
                <button className="btn btn-success" onClick={()=>{this.handleSendEnglishData(texts)}}>Translate to english</button>
                <button className="btn btn-success" style={{margin:"20px"}} onClick={()=>{this.handleSendRussianData(this.texts)}}>Translate to russian</button>
                <Link to = '/main'><button className="btn btn-success"> Go to main page </button></Link>
            </div>
        )
    }
}