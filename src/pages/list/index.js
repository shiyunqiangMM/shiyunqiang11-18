import React, { Component } from 'react'
import './index.scss'
import axios from 'axios'
import qs from 'querystring'
import { Link } from 'react-router-dom'
export default class List extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       list: []
    }
  }
  componentDidMount () {
    const { search } = this.props.location 
    const { cid } = qs.parse( search.slice(1) )
    axios({
      url: '/index.php',
      params: {
        r: 'class/cyajaxsub',
        page: 1,
        cid,
        px: 't',
        cac_id: ''
      }
    }).then( res => {
      console.log(res);
       this.setState({
         list: res.data.data.content
       })
    })
  }

  

  render() {
   const renderList = list => {
      return list.map( item =>  (
        <li key = { item.api_cid}>
          <Link 
            to = {{
              pathname: ``,
              search: ``
            }}
          >
          <div class="img-box">
            <img src={item.pic} alt=""/>
          </div>
          <div class="content-box">
            <h3> { item.d_title } </h3>
            <div class="content">
              <div class="price">
                <span> 天猫价 { item.yuanjia } </span>
                <span> 劵后价 { item.jiage } </span>
              </div>
              <div class="num">
                <span> 已售 { item.xiaoliang } 件 </span>
              </div>
            </div>
          </div>
           
          </Link>
        </li>
      ))
    }
    return (
      <div className="container">
         <ul>
          { renderList( this.state.list) }
        </ul>
      </div>
    )
  }
}
