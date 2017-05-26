/**
 * Created by mc185249 on 5/6/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../../../actions/FormPagoAction';
import * as lib from '../../../../lib/index';
import { Select, Input ,InputFecha } from '../../componentFormulario/index.jsx';

@connect((store)=>{
    return{
        store:store.FormPago,
        source:store.Source,
        Reserva:store.DataLabelPersonal.unidades,
        idUsuario:store.Layout.DataUser.id
    }
})
export default class Formulario extends React.Component{

    sendForm(){
        if(!this.formComplete()) return;
        this.props.dispatch([
            action.changeStateSendForm(true),
            action.sendForm(this.props.store,this.props.idUsuario)
        ]);
    }

    formComplete(){
        let form = this.props.store;
        if(form.Fecha &&
            form.idTipoMoneda &&
            form.idFormaPago &&
            form.importe &&
            form.idVenta){
            return true;
        }
        return false;
    }

    Unidades(){
        return this.props.Reserva.map((obj)=>{
            return {
                label:`${obj.unidad.label}`,
                value:obj.reserva,
                unidad:obj.unidad
            }
        })
    }

    render(){
        return(
                <div className="col-xs-12 col-md-8">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Pago Unidad<small> SystemHC+ </small></h5>
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
                                    label="Unidad"
                                    id="idTipoMoney"
                                    col={{label:2,input:10}}
                                    dataSource={this.Unidades()}
                                    default={this.props.store.idVenta ? this.props.store.idVenta["value"]:null}
                                    required={true}
                                    returnSelect={(value)=>{
                                        this.props.dispatch(action.insertVenta(value))
                                    }}
                                />
                                <Select
                                    label="Tipo Mondeda"
                                    id="idTipoMoney"
                                    col={{label:2,input:10}}
                                    dataSource={this.props.source.TypeMoney}
                                    default={this.props.store.idTipoMoneda ? this.props.store.idTipoMoneda["value"]:null}
                                    required={true}
                                    returnSelect={(value)=>{
                                        this.props.dispatch([
                                            action.insertMoney(value),
                                            action.insertCambioDolar("")
                                        ])
                                    }}
                                />
                                <Select
                                    label="Forma de pago"
                                    id="idAporte"
                                    col={{label:2,input:10}}
                                    dataSource={this.props.source.TypePayment}
                                    default={this.props.store.idFormaPago ? this.props.store.idFormaPago["value"]:null}
                                    required={true}
                                    returnSelect={(value)=>{
                                        this.props.dispatch(action.insertForma(value))
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
        )
    }
}