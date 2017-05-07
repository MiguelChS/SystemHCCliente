import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../actions/FormEgresoAction';
import * as lib from '../../../lib/index';
import { Select, Input ,AutoComplete,InputFecha } from '../componentFormulario/index.jsx';

@connect((store)=>{
    return{
        store:store.FormEgreso,
        source:store.Source,
        idUsuario:store.Layout.DataUser.id
    }
})
export default class Egreso extends React.Component{

    componentWillUnmount(){
        this.props.dispatch([
            action.clearForm()
        ])
    }

    addTypeCosto(props){
        return(
            {
                key:props.key,
                body:(
                    <AutoComplete
                        key={props.key}
                        label=""
                        id={props.key}
                        dataSource={props.source}
                        required={true}
                        resultadoAutoComplete={(value)=>{
                            if(!value) return;
                            let source = this.props.source.TypeCostChildren.find(obj => obj.value == value.value);
                            if(!source){
                                this.props.dispatch(action.insertTipoCosto(value));
                                return;
                            };
                            this.props.dispatch(action.insertAuto(
                                this.addTypeCosto({
                                    key:value.value,
                                    source:source.costoChildren
                                })
                            ));
                        }}
                    />
                )
            }
        )
    }

    sendForm(){
        if(!this.formComplete()) return;
        this.props.dispatch([
            action.changeStateSendForm(true),
            action.sendForm(this.props.store,this.props.idUsuario)
        ]);
    }

    formComplete(){
        let form = this.props.store;
        if(form.Fecha && form.idTipoCosto && form.idTipoMoneda && form.idTipoPago && form.importe){
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

                                <InputFecha label="Fecha"
                                            id="idFechaAporte"
                                            format="DD-MM-YYYY"
                                            default={{date1:this.props.store.Fecha}}
                                            returnDateInput={(value)=>{
                                                this.props.dispatch(action.insertFecha(value))
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
                                        this.props.dispatch(action.insertTipoMoneda(value))
                                    }}
                                />
                                <Select
                                    label="Tipo Pago"
                                    id="idTipoPago"
                                    col={{label:2,input:10}}
                                    dataSource={this.props.source.TypePayment}
                                    default={this.props.store.idTipoPago ? this.props.store.idTipoPago["value"]:null}
                                    required={true}
                                    returnSelect={(value)=>{
                                        this.props.dispatch(action.insertTipoPago(value))
                                    }}
                                />

                                <AutoComplete label="Tipo Costo"
                                              id="idCosto"
                                              dataSource={this.props.source.TypeCostParent}
                                              required={true}
                                              resultadoAutoComplete={(value)=>{
                                                  if(!value){
                                                      this.props.dispatch(action.removeAllAutoCom());
                                                      return
                                                  }
                                                  this.props.dispatch(action.insertAuto(this.addTypeCosto({
                                                      key:value.value,
                                                      source:value.costoChildren
                                                  })))
                                              }}
                                />
                                {this.props.store.autoCategoria.map((autoCom)=>{
                                    return autoCom.body
                                })}

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