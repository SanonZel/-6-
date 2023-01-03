import axios from 'axios'
import React, { Component } from 'react'
import Card from './card/Card'
import Swal from 'sweetalert2'


export default class Weather extends Component {
    constructor(props){
        super(props)
        this.state={
            citiName:'',
            weatherList:null,
            city:null
        }
      this.handleSubmit= this.handleSubmit.bind(this)
    }
    
    handleSubmit=async()=>{
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.citiName}&lang=ru&appid=986b8fe216175b5220a56aaa7eb7303c`)
            const data = await response.data
            await this.setState({
                weatherList:data.list,
                city:data.city,
                citiName:''
            })
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
              )     
        }catch(e){
           this.setState({
            city:{
                name:e.response.data.message
            }
           })
           Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: e.response.data.message,
            // footer: '<a href="">Why do I have this issue?</a>'
          })
        }
    }

  render() {
    return (
      <div>
       <form action="">
            <input type="text" value={this.state.citiName} onChange={(e)=>this.setState({
                citiName:e.target.value
            })}/>
            <button onClick={(e)=>{
                e.preventDefault()
                this.handleSubmit()
            }
              
        }>search</button>
       </form>
       <h1>{this.state.city?.name}</h1>
       <div>
        {this.state.weatherList?.map(item=><Card key={item.dt_txt} item={item}/>)}
       </div>
      </div>
    )
  }
}
