/**
 * Created by mc185249 on 4/23/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import { Select, Input } from '../componentFormulario/index.jsx';
import * as action from '../../../actions/FormUsuarioAction';
import * as lib from '../../../lib/index';

@connect((store)=>{
    return {
        store:store.FormUsuario,
        source:store.Source,
        idUsuario:store.Layout.DataUser.id
    }
})
export default class Index extends React.Component{

    sendForm(){
        if(!this.formComplete()) return;
        this.props.dispatch([
            action.changeStateSendForm(true),
            action.sendUsuario(this.props.store,this.props.idUsuario)
        ]);
    }
    formComplete(){
        let form = this.props.store;
        if(form.name && form.lastName && form.telefono && form.numDocumento && form.idTipoDocumento){
            return true;
        }
        return false;
    }

    render(){
        return(
            <div className="row">
                <div className="col-xs-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Ingreso  de Socio <small> las cuentas de usuarios se generaran automaticamente</small></h5>
                        </div>
                        <div className="ibox-content">
                            <form className="form-horizontal" onSubmit={(event)=>{
                                event.preventDefault();
                                this.sendForm();
                            }}>
                                <div className="text-center">
                                    <p className="mjsErr">{this.props.store.errMjs}</p>
                                </div>
                                <Input
                                    value={this.props.store.name}
                                    required={true}
                                    label="Nombre"
                                    placeHolder="Nombre"
                                    returnValue={(value)=>{
                                        this.props.dispatch(action.insertName(value))
                                    }}
                                />
                                <Input
                                    value={this.props.store.lastName}
                                    required={true}
                                    label="Apellido"
                                    placeHolder="Apellido"
                                    returnValue={(value)=>{
                                        this.props.dispatch(action.insertLastName(value))
                                    }}
                                />
                                <Input
                                    value={this.props.store.telefono}
                                    required={true}
                                    label="Telefono"
                                    placeHolder="Telefono"
                                    returnValue={(value)=>{
                                        if(value.length > 0 && !lib.OnlyNumber(value))return;
                                        this.props.dispatch(action.insertPhone(value))
                                    }}
                                />
                                <Input
                                    value={this.props.store.mail}
                                    required={true}
                                    label="Mail"
                                    placeHolder="Mail"
                                    returnValue={(value)=>{
                                        this.props.dispatch(action.insertMail(value))
                                    }}
                                />
                                <Select
                                    label="Tipo Documento"
                                    id="TipoDocumento"
                                    col={{label:2,input:10}}
                                    dataSource={this.props.source.typeDocument}
                                    default={this.props.store.idTipoDocumento ? this.props.store.idTipoDocumento["value"]:null}
                                    required={true}
                                    returnSelect={(value)=>{
                                        this.props.dispatch(action.insertTypeDocument(value))
                                    }}
                                />
                                <Input
                                    value={this.props.store.numDocumento}
                                    required={true}
                                    label="Numero de Documento"
                                    placeHolder="n° Documento"
                                    returnValue={(value)=>{
                                        this.props.dispatch(action.insertNumberDocument(value))
                                    }}
                                />
                                <Input
                                    value={this.props.store.importe}
                                    required={true}
                                    label="Importe"
                                    placeHolder="Importe"
                                    returnValue={(value)=>{
                                        if(value.length > 0 && !lib.OnlyNumber(value))return;
                                        this.props.dispatch(action.insertImporte(value))
                                    }}
                                />
                                <Select
                                    label="Tipo Moneda"
                                    id="idTipoMoneda"
                                    col={{label:2,input:10}}
                                    dataSource={this.props.source.TypeMoney}
                                    default={this.props.store.idTipoMoneda ? this.props.store.idTipoMoneda["value"]:null}
                                    required={true}
                                    returnSelect={(value)=>{
                                        this.props.dispatch(action.insertTypeMoney(value))
                                    }}
                                />
                                <div className="hr-line-dashed"></div>
                                <div className="form-group">
                                    <div className="col-sm-4 col-sm-offset-2">
                                        <button className="btn btn-primary"
                                                disabled={this.props.store.sendForm}
                                                type="submit">Cargar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}