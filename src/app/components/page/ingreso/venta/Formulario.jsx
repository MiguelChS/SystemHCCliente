import React from 'react';
import {connect} from 'react-redux';
import { Select, Input ,AutoComplete,InputFecha } from '../../componentFormulario/index.jsx';
import * as action from '../../../../actions/FormVentaAction';
import * as lib from '../../../../lib/index';

@connect((store)=>{
    return {
        store:store.FormSale,
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
        if(!form.idPropietario){
            this.props.dispatch(action.insertMjsErr("Seleccione un propietario"))
        }else{
            this.props.dispatch(action.insertMjsErr(""))
        }
        if(form.idUnidad && form.idPropietario && form.idEstadoVenta && form.Fecha && form.idCondicionPago && form.cantidadPago
            && form.idTipoMoneda && form.importe && form.TipoPago){
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
                            <h5>Venta de unidades <small> verifique si el comprador ya hizo una compra </small></h5>
                        </div>
                        <div className="ibox-content">
                            <form className="form-horizontal" onSubmit={(event)=>{
                                event.preventDefault();
                                this.sendForm();
                            }}>
                                <div className="text-center">
                                    <p className="mjsErr">{this.props.store.errMjs}</p>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-md-6">
                                        <AutoComplete label="Unidades"
                                                      id="idUnidad"
                                                      dataSource={this.props.source.Units}
                                                      required={true}
                                                      resultadoAutoComplete={(value)=>{
                                                          this.props.dispatch(action.insertUnits(value));
                                                      }}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <InputFecha label="Fecha"
                                                    id="idEntrega"
                                                    format="DD-MM-YYYY"
                                                    default={{date1:this.props.store.Fecha}}
                                                    returnDateInput={(value)=>{
                                                        this.props.dispatch(action.insertDate(value))
                                                    }}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-md-6">
                                        <Input
                                            value={this.props.store.importe}
                                            required={true}
                                            label="Importe"
                                            placeHolder="Importe"
                                            returnValue={(value)=>{
                                                if(value.length > 0 && !lib.OnlyNumber(value))return;
                                                this.props.dispatch(action.insertCost(value))
                                            }}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <Input
                                            value={this.props.store.cantidadPago}
                                            required={true}
                                            label="Cantidad Pagos"
                                            placeHolder="Cantidad Pagos"
                                            returnValue={(value)=>{
                                                if(value.length > 0 && !lib.OnlyNumber(value))return;
                                                this.props.dispatch(action.insertCountPayment(value))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-md-6">
                                        <Select
                                            label="Condicion de Pago"
                                            id="idCondicionPago"
                                            col={{label:2,input:10}}
                                            dataSource={this.props.source.ConditionPayment}
                                            default={this.props.store.idCondicionPago ? this.props.store.idCondicionPago["value"]:null}
                                            required={true}
                                            returnSelect={(value)=>{
                                                this.props.dispatch(action.insertConditionPayment(value))
                                            }}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <Select
                                            label="Estado de Venta"
                                            id="idEstadoVenta"
                                            col={{label:2,input:10}}
                                            dataSource={this.props.source.StateSale}
                                            default={this.props.store.idEstadoVenta ? this.props.store.idEstadoVenta["value"]:null}
                                            required={true}
                                            returnSelect={(value)=>{
                                                this.props.dispatch(action.insertStateSale(value))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 col-md-6">
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
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <Select
                                            label="Tipo Pago"
                                            id="idTipoPago"
                                            col={{label:2,input:10}}
                                            dataSource={this.props.source.TypePayment}
                                            default={this.props.store.TipoPago ? this.props.store.TipoPago["value"]:null}
                                            required={true}
                                            returnSelect={(value)=>{
                                                this.props.dispatch(action.insertTypePayment(value))
                                            }}
                                        />
                                    </div>
                                </div>

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