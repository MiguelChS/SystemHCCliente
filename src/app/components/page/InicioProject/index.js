/**
 * Created by mc185249 on 5/7/2017.
 */
import React from 'react';
import { Select, Input ,TextArea } from '../componentFormulario/index.jsx';

export default class index extends React.Component{
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
                                //this.sendForm();
                            }}>
                                <div className="text-center">
                                    <p className="mjsErr">{}</p>
                                </div>
                                <Input
                                    value={""}
                                    required={true}
                                    label="Plazo"
                                    placeHolder="Plazo"
                                    returnValue={(value)=>{
                                        //this.props.dispatch(action.insertPiso(value))
                                    }}
                                />
                                <Input
                                    value={""}
                                    required={true}
                                    label="Costo m2"
                                    placeHolder="Costo m2"
                                    returnValue={(value)=>{
                                        //this.props.dispatch(action.insertUnit(value))
                                    }}
                                />
                                <Input
                                    value={""}
                                    required={true}
                                    label="Costo Proyecto"
                                    placeHolder="Costo Proyecto"
                                    returnValue={(value)=>{
                                        //this.props.dispatch(action.insertUnit(value))
                                    }}
                                />
                                <Input
                                    value={""}
                                    required={true}
                                    label="Valor cambio dolar"
                                    placeHolder="Valor cambio dolar"
                                    returnValue={(value)=>{
                                        //if(!lib.OnlyNumber(value))return;
                                        //this.props.dispatch(action.insertSuperficie(value))
                                    }}
                                />
                                <Input
                                    value={""}
                                    required={true}
                                    label="Tasa referencia"
                                    placeHolder="Tasa referencia"
                                    returnValue={(value)=>{
                                        //if(!lib.OnlyNumber(value))return;
                                        //this.props.dispatch(action.insertSuperficie(value))
                                    }}
                                />
                                <div className="hr-line-dashed"></div>
                                <div className="form-group">
                                    <div className="col-sm-4 col-sm-offset-2">
                                        <button className="btn btn-primary"
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