/**
 * Created by mc185249 on 4/22/2017.
 */
import request from '../Request/Request.js';
import { changePage } from './indexProjectAction';
import { loadDataUser } from './LayoutAction';
import React from 'react';
import Layout from '../components/page/Layout.jsx';
export function insertUsername(valor) {
    return {
        type:"INSERT_USERNAME_LOGIN",
        value:valor
    }
}

export function insertPass(valor) {
    return {
        type:"INSERT_PASS_LOGIN",
        value:valor
    }
}

export function changeDisabledBtn() {
    return {
        type:"CHANGE_DISABLED_LOGIN"
    }
}




export function validarUsuario(usuario,pass) {
     return function(dispatch) {
         request.post('http://localhost:3001/api/LoginServer',{username:usuario,pass:pass})
             .then((result)=>{
                 let data = result.data;
                 if(data.entry){
                     dispatch([
                         changeDisabledBtn(),
                         {
                             type:"CHANGE_SHOW_MJS_LOGIN",
                             value:""
                         },loadDataUser(data.DataUser),
                         {
                             type:"LOAD_SOURCE",
                             value: data.DataSource
                         },
                         changePage(<Layout/>)
                     ])
                 }else{
                     dispatch([
                         changeDisabledBtn(),
                         {
                         type:"CHANGE_SHOW_MJS_LOGIN",
                         value:"usuario o contraseña incorrecta"
                     }])
                 }
             })
             .catch((err)=>{
                 dispatch([
                     changeDisabledBtn(),
                     {
                     type:"CHANGE_SHOW_MJS_LOGIN",
                     value:"hay un problema en el servidor intente mas tarde"
                 }])
             });
     }
}