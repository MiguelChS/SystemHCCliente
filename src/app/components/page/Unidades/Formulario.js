import React from 'react';
import { connect } from 'react-redux';
import { hiddenModal} from '../../../actions/modalAction';
import * as action from '../../../actions/FormUnidades';
import { Select, Input ,TextArea } from '../componentFormulario/index.jsx';
import * as lib from '../../../lib/index';

function sendForm(form,dispatch){
    if(!formComplete(form)) return;
    dispatch(action.enviandoFormulario(form));
}

function formComplete(form){
    return (form.piso && form.unidad && form.idOrientacion && form.caracteristicas &&
    form.superficieCubierta && form.balconTerraza && form.terrrazaExterna);
}

let FormUnidad = (props)=>{
    return(
        <form className="form-horizontal" onSubmit={(event)=>{
            event.preventDefault();
            sendForm(props.store,props.dispatch)
        }}>
            <h5> Unidades <small> SystemHC+</small></h5>
            <div className="hr-line-dashed"></div>
            <div className="text-center">
                <p className="mjsErr">{props.store.errMjs}</p>
                <p className="mjsSuccess">{props.store.MjsSuccess}</p>
            </div>
            <Input
                value={props.store.piso}
                required={true}
                label="Piso"
                placeHolder="Psio"
                returnValue={(value)=>{
                    props.dispatch(action.insertPiso(value))
                }}
            />
            <Input
                value={props.store.unidad}
                required={true}
                label="Unidad"
                placeHolder="Unidad"
                returnValue={(value)=>{
                    props.dispatch(action.insertUnit(value))
                }}
            />
            <Select
                label="Orientacion"
                id="idOrientacion"
                col={{label:2,input:10}}
                dataSource={props.source.typeOrientation}
                default={props.store.idOrientacion}
                required={true}
                returnSelect={(value)=>{
                    props.dispatch(action.insertOrientation(value))
                }}
            />
            <Input
                value={props.store.superficieCubierta}
                required={true}
                label="Superficie Cubierta"
                placeHolder="Superficie cubierta"
                returnValue={(value)=>{
                    if(!lib.OnlyNumber(value))return;
                    props.dispatch(action.insertSuperficie(value))
                }}
            />
            <Input
                value={props.store.balconTerraza}
                required={true}
                label="Balcon/Terraza"
                placeHolder="Balcon/Terraza"
                returnValue={(value)=>{
                    if(!lib.OnlyNumber(value))return;
                    props.dispatch(action.insertBalcon(value))
                }}
            />
            <Input
                value={props.store.terrrazaExterna}
                required={true}
                label="Terraza externa"
                placeHolder="terraza externa"
                returnValue={(value)=>{
                    if(!lib.OnlyNumber(value))return;
                    props.dispatch(action.insertTerraza(value))
                }}
            />
            <TextArea
                value={props.store.caracteristicas}
                required={true}
                label="Caracteristicas"
                placeHolder="Caracteristicas"
                returnValue={(value)=>{
                    props.dispatch(action.insertFeature(value))
                }}
            />
            <div className="hr-line-dashed"></div>
            <div className="form-group">
                <div className="col-xs-12 text-right">
                    <button className="btn btn-primary separarButton"
                            disabled={props.store.sendForm}
                            type="submit">Cargar</button>
                    <button className="btn btn-primary separarButton"
                            type="button"
                            disabled={props.store.sendForm}
                            onClick={()=>{
                                props.dispatch([
                                    action.insertMjsSuccess(""),
                                    action.insertMjsErr(""),
                                    action.clearForm(),
                                    hiddenModal(props.idModal)
                                ])
                            }}>
                        Cancelar
                    </button>
                </div>
            </div>
        </form>
    )
};

const mapStateToProps= (state)=>{
    return {
        store:state.FormUnits,
        source:state.Source,
        request:state.Layout.request
    }
};

export default connect(mapStateToProps)(FormUnidad);
