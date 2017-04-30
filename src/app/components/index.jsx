/**
 * Created by mc185249 on 4/22/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import {changePage} from '../actions/indexProjectAction';
import Login from './page/login/index.jsx';
@connect((store)=>{
    return{
        store:store.IndexPage
    }
})
export default class Index extends React.Component{
    componentDidMount(){
        if(!this.props.store.login){
            this.props.dispatch(changePage(<Login/>))
        }
    }
    render(){
        return(this.props.store.bodyRender)
    }
}