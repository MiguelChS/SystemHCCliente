import React from 'react';
import {changeShowLeftMenu,loadBodyContent} from '../../actions/LayoutAction';
import {changePage} from '../../actions/indexProjectAction';
import Login from '../page/login/index.jsx';

export default (props)=>{
    let marginLeft = props.store.showMenuLeft ? "220px":"0";
    return(
        <div className="row border-bottom">
            <nav className="navbar navbar-fixed-top white-bg" role="navigation"
                 style={{marginBottom:"0",marginLeft:marginLeft}}>
                <div className="navbar-header">
                    <a className="navbar-minimalize minimalize-styl-2 btn btn-primary "
                       href="JavaScript:void(0)"
                        onClick={()=>{
                            props.dispatch(changeShowLeftMenu());
                        }}
                    >
                        <i className="fa fa-bars"/>
                    </a>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li>
                        <span className="m-r-sm text-muted welcome-message">Bienvenido a SystemHC+</span>
                    </li>
                    <li>
                        <a href="JavaScript:void(0)"
                            onClick={()=>{
                                props.dispatch([
                                    loadBodyContent(null),
                                    changePage(<Login/>)])
                            }}
                        >
                            <i className="fa fa-sign-out"/> Log out
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}