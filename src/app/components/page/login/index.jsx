import React from 'react'
import Request from '../../../Request/Request';
import {connect} from 'react-redux';
import {insertPass,insertUsername,validarUsuario,changeDisabledBtn} from '../../../actions/loginAction';

@connect((store)=>{
    return {
        store:store.Login
    }
})
export  default class Index extends React.Component{

    loginProccess(){
        this.props.dispatch([
            changeDisabledBtn(),
            validarUsuario(this.props.store.username,this.props.store.pass)
        ]);
    }

    render(){
        return(
            <div className="middle-box text-center loginscreen animated fadeInDown">
                <div>
                    <div>
                        <h1 className="logo-name">HC+</h1>
                    </div>
                    <h3>Bienvenido a SystemHC+</h3>
                    <p>Sistema de carga,administración y análisis de resultado para proyectos</p>
                    <p className="mjsErr">{this.props.store.showMjs}</p>
                    <form className="m-t" onSubmit={(event)=>{
                        event.preventDefault();
                        this.loginProccess();
                    }}>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   placeholder="Username"
                                   required
                                    onChange={(event)=>{
                                        this.props.dispatch(insertUsername(event.target.value))
                                    }}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                required
                                onChange={(event)=>{
                                    this.props.dispatch(insertPass(event.target.value))
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary block full-width m-b"
                            style={{border:"0"}}
                            disabled={this.props.store.Btn_search}
                        >
                            Login
                        </button>

                        <a href="#"><small>Forgot password?</small></a>
                    </form>
                </div>
            </div>
        )
    }
}

/*<div className="container-fluid">
 <div className="row">
 <div className="col-xs-12 col-sm-6 col-sm-offset-3">
 <form style={{border:"1px solid",padding:"10px",marginTop:"80px"}}>
 <div className="form-group">
 <label for="email">Username</label>
 <input type="email" className="form-control" id="email"
 placeholder="userName"
 onChange={(event)=>{
 this.props.dispatch(insertUsername(event.target.value))
 }}
 />
 </div>
 <div className="form-group">
 <label for="pass">Password</label>
 <input type="password" className="form-control" id="pass"
 onChange={(event)=>{
 this.props.dispatch(insertPass(event.target.value))
 }}
 placeholder="Password"/>
 </div>
 <button type="button" className="btn btn-default" onClick={this.loginProccess.bind(this)}>
 Login
 </button>
 </form>
 </div>
 </div>
 </div>*/