import React from 'react';
import {connect} from 'react-redux';
import { Select, Input ,InputFecha } from '../../componentFormulario/index.jsx';
import * as action from '../../../../actions/FormAporteAction';
import * as lib from '../../../../lib/index';

@connect((store)=>{
    return {
        store:store.FormAporte,
        source:store.Source,
        idUsuario:store.Layout.DataUser.id
    }
})
export default class Index extends React.Component{
    sendForm(){
        if(!this.formComplete()) return;
        this.props.dispatch([
            action.changeStateSendForm(true),
            action.sendForm(this.props.store,this.props.idUsuario,'idUnidad')
        ]);
    }

    formComplete(){
        let form = this.props.store;
        if(!form.idSocio){
            this.props.dispatch(action.insertMjsErr("Seleccione un propietario"))
        }else{
            this.props.dispatch(action.insertMjsErr(""))
        }
        if(form.idSocio && form.idTipoMoneda && form.importe && form.idTipoAporte && form.Fecha){
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
                            <h5>Aporte de Socio <small> SystemHC+ </small></h5>
                        </div>
                        <div className="ibox-content">
                            <form className="form-horizontal" onSubmit={(event)=>{
                                event.preventDefault();
                                this.sendForm();
                            }}>
                                <div className="text-center">
                                    <p className="mjsErr">{this.props.store.errMjs}</p>
                                </div>
                                <Select
                                    label="Tipo Mondeda"
                                    id="idTipoMoney"
                                    col={{label:2,input:10}}
                                    dataSource={this.props.source.TypeMoney}
                                    default={this.props.store.idTipoMoneda ? this.props.store.idTipoMoneda["value"]:null}
                                    required={true}
                                    returnSelect={(value)=>{
                                        this.props.dispatch([
                                            action.insertTypeMoney(value),
                                            action.insertCambio("")
                                        ])
                                    }}
                                />
                                <Select
                                    label="Tipo Aporte"
                                    id="idAporte"
                                    col={{label:2,input:10}}
                                    dataSource={this.props.source.typeContribute}
                                    default={this.props.store.idTipoAporte ? this.props.store.idTipoAporte["value"]:null}
                                    required={true}
                                    returnSelect={(value)=>{
                                        this.props.dispatch(action.insertTypeAporte(value))
                                    }}
                                />
                                <InputFecha label="Fecha"
                                            id="idEntrega"
                                            format="DD-MM-YYYY"
                                            default={{date1:this.props.store.Fecha}}
                                            returnDateInput={(value)=>{
                                                this.props.dispatch(action.insertDate(value))
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
                                <div className="hr-line-dashed"></div>
                                <div className="form-group">
                                    <div className="text-center">
                                        <button className="btn btn-primary"
                                                disabled={this.props.store.sendForm}
                                                type="submit">
                                            Cargar
                                        </button>
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
