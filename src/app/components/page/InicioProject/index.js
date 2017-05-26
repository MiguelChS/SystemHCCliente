/**
 * Created by mc185249 on 5/7/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import * as action from '../../../actions/InicioProjectAction';
import { Input ,InputFecha } from '../componentFormulario/index.jsx';
import * as lib from '../../../lib/index';
@connect((state)=>{
    return{
        store:state.startProject,
        request:state.Layout.request
    }
})
export default class index extends React.Component{

    componentDidMount(){
        this.props.dispatch(action.searchData())
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Inicio proyecto<small> datos fundamentales para el funcionameinto del sistema</small></h5>
                            </div>
                            <div className="ibox-content">
                                <form className="form-horizontal" onSubmit={(event)=>{
                                    event.preventDefault();
                                }}>
                                    <div className="text-center">
                                        <p className="mjsErr">{this.props.store.errMjs}</p>
                                        <p className="mjsSuccess">{this.props.store.mjsSuccess}</p>
                                    </div>
                                    <InputFecha label="Fecha"
                                                id="idEntrega"
                                                format="MM-YYYY"
                                                default={{date1:this.props.store.Fecha}}
                                                returnDateInput={(value)=>{
                                                    this.props.dispatch(action.insertDate(value))
                                                }}
                                    />
                                    <Input
                                        value={this.props.store.plazoProjecto}
                                        required={true}
                                        label="Plazo"
                                        placeHolder="Plazo"
                                        returnValue={(value)=>{
                                            if(value.length > 0 && !lib.OnlyNumber(value))return;
                                            this.props.dispatch(action.insertPlazo(value))
                                        }}
                                        disabled={this.props.request}
                                    />
                                    <Input
                                        value={this.props.store.cambioDolar}
                                        required={true}
                                        label="Cambio Dolar"
                                        placeHolder="Cambio Dolar"
                                        returnValue={(value)=>{
                                            this.props.dispatch(action.insertCambioDolar(value))
                                        }}
                                        disabled={this.props.request}
                                    />
                                    <Input
                                        value={this.props.store.costoM2}
                                        required={true}
                                        label="Costo m2"
                                        placeHolder="Costo m2"
                                        returnValue={(value)=>{
                                            this.props.dispatch(action.insertCostoM2(value))
                                        }}
                                        disabled={this.props.request}
                                    />
                                    <Input
                                        value={this.props.store.tasaReferencia}
                                        required={true}
                                        label="Tasa referencia"
                                        placeHolder="Tasa referencia"
                                        returnValue={(value)=>{
                                            this.props.dispatch(action.insertTaza(value))
                                        }}
                                        disabled={this.props.request}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Carga<small> costo y ingresos mensuales</small></h5>
                            </div>
                            <div className="ibox-content">
                                <div className="row">
                                    <div className="col-xs-12" style={{maxHeight:400,overflow:"scroll"}}>
                                        <table className="table table-striped table-hover">
                                            <thead>
                                            <tr>
                                                <th>Mes</th>
                                                <th>Costo</th>
                                                <th>Ingreso</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.props.store.tabla.map( (obj,i) =>{
                                                return(
                                                    <tr key={i}>
                                                        <td>{obj.fechaLabel}</td>
                                                        <td>
                                                            <input type="text" value={obj.costo}
                                                                   onChange={(event)=>{
                                                                       this.props.dispatch(action.ingresoCosto({fecha:obj.fechaLabel,costo:event.target.value}))
                                                                   }}
                                                                   placeholder="Costo en pesos"
                                                                   disabled={this.props.request}
                                                                   className="input-sm form-control"/>
                                                        </td>
                                                        <td>
                                                            <input type="text" value={obj.ingreso}
                                                                   placeholder="Ingreso en pesos"
                                                                   disabled={this.props.request}
                                                                   onChange={(event)=>{
                                                                       this.props.dispatch(action.ingresoIngreso({fecha:obj.fechaLabel,ingreso:event.target.value}))
                                                                   }}
                                                                   className="input-sm form-control"/>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 text-center" style={{marginTop:"15px"}}>
                                        <button className="btn btn-primary"
                                                onClick={()=>{
                                                    this.props.dispatch(action.sendData(this.props.store))
                                                }}
                                                disabled={this.props.request}
                                                type="button">Cargar</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

/*<div className="hr-line-dashed"></div>
 <div className="form-group">
 <div className="col-sm-4 col-sm-offset-2">
 <button className="btn btn-primary"
 type="submit">Cargar</button>
 </div>
 </div>*/