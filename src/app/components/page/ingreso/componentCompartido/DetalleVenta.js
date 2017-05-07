/**
 * Created by mc185249 on 5/3/2017.
 */
import React from 'react';

const precio = (props,precio)=>{
    if(!props.idUnidad) return "";
    let supTotal = 0;
    supTotal += props.idUnidad.superficie;
    supTotal += props.idUnidad.terraza;
    supTotal += props.idUnidad.balcon;
    return supTotal * 15;
};

export default (props)=>{
    return(
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    <h5> Detalle de Venta <small> SystemHC+</small></h5>
                </div>
                <div className="ibox-content text-left">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-xs-6">
                                    <p><strong>Precio : </strong>{precio(props.store)}</p>
                                </div>
                                <div className="col-xs-6">
                                    <p><strong>Tipo Moneda : </strong> Dolares </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12">
                            <div className="row">
                                <div className="col-xs-6">
                                    <p><strong>Reserva : </strong>
                                        {props.store.selectUnidadReserva ? props.store.selectUnidadReserva.reserva.importe : ""}</p>
                                </div>
                                <div className="col-xs-6">
                                    <p><strong>Tipo Moneda : </strong>
                                        {props.store.selectUnidadReserva ? props.store.selectUnidadReserva.reserva.Moneda : ""}</p>
                                </div>
                            </div>
                        </div>
                        {(()=>{
                            if(props.store.TipoVenta && props.store.TipoVenta.value == "58fece623b2ef968436b32c6"){
                                return<div className="col-xs-12">
                                    <div className="row">
                                        <div className="col-xs-6">
                                            <p><strong>Adelanto : </strong>{props.store.importeAdelanto ? props.store.importeAdelanto : "" }</p>
                                        </div>
                                        <div className="col-xs-6">
                                            <p><strong>Tipo Moneda : </strong>{props.store.tipoMonedaAdelanto ? props.store.tipoMonedaAdelanto.label : "" }</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        })()}
                    </div>
                </div>
            </div>
    )
}