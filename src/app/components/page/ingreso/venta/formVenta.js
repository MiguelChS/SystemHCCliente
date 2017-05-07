/**
 * Created by mc185249 on 5/2/2017.
 */
import React from 'react';
import { Select, Input ,AutoComplete,InputFecha } from '../../componentFormulario/index.jsx';
import * as lib from '../../../../lib/index';

export default (props)=>{
    return(
        <div>
            <div className="text-center">
                <p className="mjsErr">{props.store.errMjs}</p>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <AutoComplete label="Unidades"
                                  id="idUnidad"
                                  dataSource={props.source.Units}
                                  required={true}
                                  resultadoAutoComplete={(value)=>{
                                      props.resultAutoUnit(value);
                                  }}
                                  disabled={(props.store.selectUnidadReserva != null)}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <InputFecha label="Fecha"
                                id="idEntrega"
                                format="DD-MM-YYYY"
                                default={{date1:props.store.Fecha}}
                                returnDateInput={(value)=>{
                                    props.onDate(value);
                                }}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Input
                        value={props.store.importeAdelanto}
                        required={true}
                        label="Adelanto"
                        placeHolder="Importe de adelanto"
                        returnValue={(value)=>{
                            if(value.length > 0 && !lib.OnlyNumber(value))return;
                            props.onImpotAde(value);
                        }}
                    />
                </div>
                <div className="col-xs-12 col-md-6">
                    <Select
                        label="Moneda Adelanto"
                        id="idTipoMoneda"
                        col={{label:2,input:10}}
                        dataSource={props.source.TypeMoney}
                        default={props.store.tipoMonedaAdelanto ? props.store.tipoMonedaAdelanto["value"]:null}
                        required={true}
                        returnSelect={(value)=>{
                            props.onTypeMoneyAde(value);
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Select
                        label="Forma de Pago"
                        id="idTipoMoneda"
                        col={{label:2,input:10}}
                        dataSource={props.source.TypePayment}
                        default={props.store.tipoPagoAdelanto ? props.store.tipoPagoAdelanto["value"]:null}
                        required={true}
                        returnSelect={(value)=>{
                            props.onTypePagoAde(value);
                        }}
                    />
                </div>
            </div>
            {(()=>{
                if(props.store.TipoVenta.value == "58fece623b2ef968436b32c6"){
                    return(
                        <div>
                            <div className="hr-line-dashed"></div>
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <Input
                                        value={props.store.importeCuota}
                                        required={true}
                                        label="Cuotas"
                                        placeHolder="Importe de Cuotas"
                                        returnValue={(value)=>{
                                            if(value.length > 0 && !lib.OnlyNumber(value))return;
                                            props.onImpotCuo(value);
                                        }}
                                    />
                                </div>
                                <div className="col-xs-12 col-md-6">
                                    <Input
                                        value={props.store.cantidadPago}
                                        required={true}
                                        label="Cantidad Pagos"
                                        placeHolder="Cantidad Pagos"
                                        returnValue={(value)=>{
                                            if(value.length > 0 && !lib.OnlyNumber(value))return;
                                            props.onCountPago(value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    <Select
                                        label="Moneda Cuota"
                                        id="idTipoMoneda"
                                        col={{label:2,input:10}}
                                        dataSource={props.source.TypeMoney}
                                        default={props.store.idTipoMonedaCuota ? props.store.idTipoMonedaCuota["value"]:null}
                                        required={true}
                                        returnSelect={(value)=>{
                                            props.onTypeMoneyCuo(value);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                }else{
                    return null;
                }

            })()}

        </div>
    )
}