import React from 'react';
import {InputButton} from '../../componentFormulario/index.jsx';

export default (props)=>{
    return(
            <div className="col-xs-12 col-md-6">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5> Verificar propietario <small> SystemHC+</small></h5>
                    </div>
                    <div className="ibox-content">
                        <div className="row">
                            <div className="col-xs-12">
                                <InputButton
                                    btnLabel="Buscar"
                                    btnClick={()=>{
                                        if(props.store.numberDocumentSerach.length == 0) return;
                                        props.btnSearch();
                                    }}
                                    value={props.store.numberDocumentSerach}
                                    required={false}
                                    label="N° Documento"
                                    placeHolder="n° Documento"
                                    returnValue={(value)=>{
                                        props.onChangeNumDoc(value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row text-center">
                            <p className="mjsErr">{props.store.errMjsSearch}</p>
                        </div>
                        {(()=>{
                            if(props.hasOwnProperty('onClickNewProp')){
                                return(
                                    <div className="row">
                                        <div className="col-xs-12 text-center">
                                            <button className="btn btn-primary"  style={{marginTop:"10px"}}
                                                    type="button"
                                                    onClick={()=>{
                                                        props.onClickNewProp();
                                                    }}
                                            >
                                                Nuevo Propietario
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                </div>
            </div>
    )
}