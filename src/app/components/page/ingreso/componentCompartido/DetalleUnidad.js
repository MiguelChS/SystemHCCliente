/**
 * Created by mc185249 on 5/3/2017.
 */
import React from 'react';

const precio = (props,precio)=>{
    if(!props) return "";
    let supTotal = 0;
    supTotal += props.superficie;
    supTotal += props.terraza;
    supTotal += props.balcon;
    return supTotal * precio;
};

export default (props)=>{
    console.log(props);
    return(
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    <h5> Datos de Unidad <small> SystemHC+</small></h5>
                </div>
                <div className="ibox-content text-center">
                    <div className="row">
                        <div className="col-xs-6">
                            <p><strong>Unidad : </strong>{props.store ? props.store.label : null}</p>
                        </div>
                        <div className="col-xs-6">
                            <p><strong>Piso : </strong> {props.store ? props.store.piso : null}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <p><strong>Orientacion : </strong>{props.store ? props.store.orientacion : null}</p>
                        </div>
                        <div className="col-xs-6">
                            <p><strong>Superficie : </strong>{props.store ? `${props.store.superficie}m²` : null} </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <p><strong>Terraza : </strong> {props.store ? `${props.store.terraza}m²` : null }</p>
                        </div>
                        <div className="col-xs-6">
                            <p><strong>Balcon : </strong>{props.store ? `${props.store.balcon}m²`: null} </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <p><strong>Precio : </strong> {`us$ ${precio(props.store,15)}`}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <p><strong>Descripcion : </strong> {props.store ? props.store.caracteristicas : null}</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}