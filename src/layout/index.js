import React, { Component,Fragment } from 'react'
import Tab from '../components/common/tab'
import TabBar from '../components/common/tabbar'
import { Route,Switch,Redirect,withRouter } from 'react-router-dom'
import Home from './../pages/home/index';
import Recommend from './../pages/recommend/index';
import Category from './../pages/category/index';
import Mine from './../pages/mine/index';
import ShopCar from './../pages/shopcar/index';
import NotFound from './../pages/notfound/index';
import Login from './../pages/login/index';
import Register from './../pages/register/index';
import List from './../pages/list/index';
import Detail from './../pages/detail/index';


class LayOut extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       tabFlag: false,
       name: 'minghui',
       title: {
         '/home': 'MM',
         '/recommend': '推荐',
         '/category': '分类',
         '/shopcar': '购物车',
         '/mine': "个人中心",
         '/home/hot': '正在热映',
         '/home/comming': '即将上映',
         '/list': '列表',
         '/login': '登录',
         '/detail': '详情页',
         '/register': '注册'
       },
       arr: ['/recommend','/shopcar','/category','/mine','/login','/register'],
       tab_bar_arr: [ '/recommend','/mine' ],
       tabBarFlag: true
    }
  }

  componentDidMount () {
    this.checkTabFlag()
    this.checkTabBar()
    this.checkHomeToHot()
  }

  componentWillReceiveProps ( nextProps ) {
    this.checkTabFlag( nextProps )
    this.checkTabBar( nextProps )
    this.checkHomeToHot( nextProps )
  }


  checkTabFlag = nextProps => {
    const { pathname } = nextProps && nextProps.location || this.props.location 
    const f = this.state.arr.some( item => item == pathname )
    if ( f ) {
      this.setState({
        tabFlag: true
      })
    } else {
      this.setState({
        tabFlag: false
      })
    }
  }

  checkTabBar = nextProps => {
    const { pathname } = nextProps && nextProps.location || this.props.location 
    const f = this.state.tab_bar_arr.some( item => item == pathname )
    if ( f ) {
      this.setState({
        tabBarFlag: false
      })
    } else {
      this.setState({
        tabBarFlag: true
      })
    }
  }
  
  checkHomeToHot = nextProps => {
    const { pathname } = nextProps && nextProps.location || this.props.location 
    const { push,replace } = nextProps && nextProps.history || this.props.history
    if ( pathname == '/home' ) {
      push('/home/hot')
    }
  }

  render() {
    const { tabFlag,name,title,tabBarFlag } = this.state 
    const { pathname } = this.props.location 
    return (
      <div className = "layout">
        <Tab tabFlag = { tabFlag }  title = { title[ pathname ] } { ...this.props } />
        <Switch>
          <Redirect from = "/" to = "/home" exact/>
          <Route path = "/home" component = { Home }/>
          <Route path = "/recommend" component = { Recommend }/>
          <Route path = "/category" component = { Category }/>
          <Route path = "/shopcar" component = { ShopCar }/>
          {/* <Route path = "/mine" component = { Mine }/> */}
          {/* <Route path = "/mine" render = {() => <Mine name = { name } />}/> */}
          <Route path = "/mine" children = {() => <Mine name = { name } />}/>
          <Route path = "/login" component = { Login } />
          <Route path = "/register" component = { Register } />
          <Route path = "/list/:id" component = { List } />
          <Route path = "/detail/:id" component = { Detail } />
          <Route  component = { NotFound }/> 
        </Switch>
        { tabBarFlag && <TabBar/>}
      </div>
    )
  }
}


export default withRouter( LayOut )