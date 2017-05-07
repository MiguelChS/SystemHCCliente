import React from 'react';
import {connect} from 'react-redux';
import { Select } from '../../componentFormulario/index.jsx';
import * as action from '../../../../actions/FormVentaAction';
import FormVenta from './formVenta';

@connect((store)=>{
    return {
        store:store.FormSale,
        source:store.Source,
        idUsuario:store.Layout.DataUser.id,
        Reserva:store.DataLabelPersonal.unidades
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
        if(!form.TipoVenta) return false;
        if(!form.idPropietario){
            this.props.dispatch(action.insertMjsErr("Seleccione un propietario"))
        }else{
            this.props.dispatch(action.insertMjsErr(""))
        }
        if(form.TipoVenta.value == "58fece623b2ef968436b32c6"){
            if( form.idUnidad &&
                form.idPropietario &&
                form.Fecha &&
                form.importeAdelanto &&
                form.tipoMonedaAdelanto &&
                form.tipoPagoAdelanto &&
                form.cantidadPago &&
                form.idTipoMonedaCuota &&
                form.importeCuota){
                return true
            }else{
                return false;
            }
        }else{
            if( form.idUnidad &&
                form.idPropietario &&
                form.Fecha &&
                form.importeAdelanto &&
                form.tipoMonedaAdelanto &&
                form.tipoPagoAdelanto){
                return true
            }else{
                return false;
            }
        }
    }

    Reserva(){
        return this.props.Reserva.map((obj)=>{
            return {
                label:`${obj.unidad.label} - ${obj.reserva.importe} - ${obj.reserva.Moneda}`,
                value:obj.reserva.id_venta,
                unidad:obj.unidad,
                reserva:obj.reserva
            }
        })
    }

    render(){
        let disabledRe = !(this.props.store.TipoVenta && this.props.store.TipoVenta.value == "58fece623b2ef968436b32c6");
        return(
                <div className="col-xs-12 col-md-8">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h5>Venta de unidades <small> verifique si el comprador ya hizo una compra </small></h5>
                        </div>
                        <div className="ibox-content">
                            <form className="form-horizontal" onSubmit={(event)=>{
                                event.preventDefault();
                                this.sendForm();
                            }}>
                                <div className="row">
                                    <div className="col-xs-12 col-md-6">
                                        <Select
                                            label="Tipo Venta"
                                            id="idTipoVenta"
                                            col={{label:2,input:10}}
                                            dataSource={this.props.source.StateSale}
                                            default={this.props.store.TipoVenta ? this.props.store.TipoVenta["value"]:null}
                                            required={false}
                                            returnSelect={(value)=>{
                                                this.props.dispatch([
                                                    action.clearForm(true),
                                                    action.insertTypeVenta(value)
                                                ])
                                            }}
                                        />
                                    </div>
                                    <div className="col-xs-12 col-md-6">
                                        <Select
                                            label="Reservas Pendientes"
                                            id="idReservaPendiente"
                                            col={{label:2,input:10}}
                                            disabled={disabledRe}
                                            dataSource={this.Reserva()}
                                            default={this.props.store.selectUnidadReserva ? this.props.store.selectUnidadReserva["value"]:null}
                                            required={false}
                                            returnSelect={(value)=>{
                                                this.props.dispatch(action.insertUnitsReserve(value))
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="hr-line-dashed"></div>

                                {(()=>{
                                    if(!this.props.store.TipoVenta) return null;
                                    return <FormVenta
                                        store={this.props.store}
                                        source={this.props.source}
                                        resultAutoUnit={(value)=>{
                                            this.props.dispatch(action.insertUnits(value));
                                        }}
                                        onDate={(date)=>{
                                            this.props.dispatch(action.insertDate(date))
                                        }}
                                        onImpotAde={(importe)=>{
                                            this.props.dispatch(action.insertCostoAdelanto(importe))
                                        }}
                                        onTypeMoneyAde={(money)=>{
                                            this.props.dispatch(action.insertTipoMonedaAdelanto(money))
                                        }}
                                        onTypePagoAde={(TypeAde)=>{
                                            this.props.dispatch(action.insertTypePaymentAde(TypeAde));
                                        }}
                                        onCountPago={(countPago)=>{
                                            this.props.dispatch(action.insertCountPayment(countPago));
                                        }}
                                        onTypeMoneyCuo={(money)=>{
                                            this.props.dispatch(action.insertTypeMoneyCuota(money));
                                        }}
                                        onImpotCuo={(importe)=>{
                                            this.props.dispatch(action.insertCostCouta(importe));
                                        }}
                                    />
                                })()}

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