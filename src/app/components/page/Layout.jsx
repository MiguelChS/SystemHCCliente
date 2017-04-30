import React from 'react';
import Nav from '../nav/nav.jsx';
import FooterHC from '../footer/index.jsx';
import NavWrap from '../nav/NavWrap.jsx';
import Modal from './componentFormulario/modal.jsx';
import {connect} from  'react-redux';
@connect((store)=>{
    return{
        store:store.Layout,
        modal:store.Modal
    }
})
export default class Layout extends React.Component{

    componentDidMount(){
        this.resizeHeight();
        window.addEventListener("resize",this.resizeHeight);
    }
    componentWillUnmount(){
        window.removeEventListener("resize",this.resizeHeight);
    }

    resizeHeight(){
        let wrapper = document.getElementById("page-wrapper");
        wrapper.style.minHeight = `${window.innerHeight}px`;
    }

    render(){
        let marginLeft = this.props.store.showMenuLeft ? "220px":"0";
        return(
            <div id="wrapper">
                <Nav
                    store={this.props.store}
                    dispatch={this.props.dispatch}
                />
                <div id="page-wrapper" className="gray-bg" style={{marginLeft:marginLeft}}>
                    <NavWrap
                        store={this.props.store}
                        dispatch={this.props.dispatch}
                    />
                    <div className="wrapper wrapper-content animated fadeInRight" >
                        {this.props.store.bodyContent}
                    </div>
                    <FooterHC/>
                </div>
                {this.props.modal.map((obj)=>{
                    return <Modal key={obj.id} store={obj} />
                })}
            </div>
        );
    }
}