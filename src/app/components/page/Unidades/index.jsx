import React from 'react';
import {connect} from 'react-redux';
import { Select, Input ,TextArea } from '../componentFormulario/index.jsx';
import * as action from '../../../actions/FormUnidades';
import * as lib from '../../../lib/index';

@connect((store)=>{
    return {
        store:store.FormUnits,
        source:store.Source
    }
})
export default class Index extends React.Component{
    sendForm(){
        if(!this.formComplete()) return;
        this.props.dispatch([
            action.changeStateSendForm(true),
            action.sendForm(this.props.store)
        ]);
    }

    formComplete(){
        let form = this.props.store;
        if(form.piso && form.unidad && form.idOrientacion && form.caracteristicas &&
            form.superficieCubierta && form.balconTerraza && form.terrrazaExterna){
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
                                    value={this.props.store.piso}
                                    required={true}
                                    label="Piso"
                                    placeHolder="Psio"
                                    returnValue={(value)=>{
                                        this.props.dispatch(action.insertPiso(value))
                                    }}
                                />
                                <Input
                                    value={this.props.store.unidad}
                                    required={true}
                                    label="Unidad"
                                    placeHolder="Unidad"
                                    returnValue={(value)=>{
                                        this.props.dispatch(action.insertUnit(value))
                                    }}
                                />
                                <Select
                                    label="Orientacion"
                                    id="idOrientacion"
                                    col={{label:2,input:10}}
                                    dataSource={this.props.source.typeOrientation}
                                    default={this.props.store.idOrientacion ? this.props.store.idOrientacion["value"]:null}
                                    required={true}
                                    returnSelect={(value)=>{
                                        this.props.dispatch(action.insertOrientation(value))
                                    }}
                                />
                                <Input
                                    value={this.props.store.superficieCubierta}
                                    required={true}
                                    label="Superficie Cubierta"
                                    placeHolder="Superficie cubierta"
                                    returnValue={(value)=>{
                                        if(!lib.OnlyNumber(value))return;
                                        this.props.dispatch(action.insertSuperficie(value))
                                    }}
                                />
                                <Input
                                    value={this.props.store.balconTerraza}
                                    required={true}
                                    label="Balcon/Terraza"
                                    placeHolder="Balcon/Terraza"
                                    returnValue={(value)=>{
                                        if(!lib.OnlyNumber(value))return;
                                        this.props.dispatch(action.insertBalcon(value))
                                    }}
                                />
                                <Input
                                    value={this.props.store.terrrazaExterna}
                                    required={true}
                                    label="Terraza externa"
                                    placeHolder="terraza externa"
                                    returnValue={(value)=>{
                                        if(!lib.OnlyNumber(value))return;
                                        this.props.dispatch(action.insertTerraza(value))
                                    }}
                                />
                                <TextArea
                                    value={this.props.store.caracteristicas}
                                    required={true}
                                    label="Caracteristicas"
                                    placeHolder="Caracteristicas"
                                    returnValue={(value)=>{
                                        this.props.dispatch(action.insertFeature(value))
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