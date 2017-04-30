import React from 'react';
import {connect} from 'react-redux';
import { Select, Input } from '../../componentFormulario/index.jsx';
import * as action from '../../../../actions/FormPropietarioAction';
import {insertOwner} from '../../../../actions/FormVentaAction'
import { hiddenModal} from '../../../../actions/modalAction';
import * as lib from '../../../../lib/index';

@connect((store)=>{
    return {
        store:store.FormOwner,
        source:store.Source
    }
})
export default class FormProp extends React.Component{

    sendForm(){
        if(!this.formComplete()) return;
        this.props.dispatch([
            action.changeStateSendForm(true),
            action.sendForm(this.props.store,insertOwner)
        ]);
    }

    formComplete(){
        let form = this.props.store;
        if(form.name && form.lastName && form.telefono && form.numDocumento && form.idTipoDocumento && form.mail){
            return true;
        }
        return false;
    }

    render(){
        return(
            <form className="form-horizontal" onSubmit={(event)=>{
                event.preventDefault();
                this.sendForm();
            }}>
                <h5> Propietario <small> SystemHC+</small></h5>
                <div className="hr-line-dashed"></div>
                <div className="text-center">
                    <p className="mjsErr">{this.props.store.errMjs}</p>
                    <p className="mjsSuccess">{this.props.store.mjsSuccess}</p>
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
                    value={this.props.store.mail}
                    required={true}
                    label="Mail"
                    placeHolder="Mail"
                    returnValue={(value)=>{
                        this.props.dispatch(action.insertMail(value))
                    }}
                />
                <div className="hr-line-dashed"></div>
                <div className="form-group">
                    <div className="col-xs-12 text-right">
                        <button className="btn btn-primary separarButton"
                                disabled={this.props.store.sendForm}
                                type="submit">Cargar</button>
                        <button className="btn btn-primary separarButton"
                                type="button"
                                disabled={this.props.store.sendForm}
                                onClick={()=>{
                                    this.props.dispatch([
                                        action.insertMjsSuccess(""),
                                        action.insertMjsErr(""),
                                        action.clearForm(),
                                        hiddenModal(this.props.idModal)
                                    ])
                                }}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}