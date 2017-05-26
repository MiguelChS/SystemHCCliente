/**
 * Created by mc185249 on 5/7/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../../actions/CajaAction';
import moment from 'moment';

@connect((store)=>{
    return{
        store:store.Caja,
        cambioDolar:store.Layout.cambioDefault
    }
})
export default class Caja extends React.Component{

    componentDidMount(){
        let chart = new window.google.visualization.ColumnChart(document.getElementById("ChartCaja"));
        this.props.dispatch(action.searchData(chart,this.props.cambioDolar));
    }

    render(){
        let totalPesos = this.props.store.totalCajaPesos + (this.props.store.totalCajaDolar * this.props.store.Moneda);
        return(
            <div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label resultColor pull-right">a la fecha</span>
                                <h5>Resultado</h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">$ {totalPesos}</h1>
                                <div className="stat-percent font-bold text-success">
                                    {(()=>{
                                        if(totalPesos < 0){
                                            return <i className="fa fa-level-down"/>
                                        }else{
                                            return <i className="fa fa-level-up"/>
                                        }
                                    })()}
                                </div>
                                <small>Caja total en pesos</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label label-warning pull-right">a la fecha</span>
                                <h5>Caja Pesos</h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">$ {this.props.store.totalCajaPesos}</h1>
                                <div className="stat-percent font-bold text-warning">
                                    {(()=>{
                                        if(this.props.store.totalCajaPesos < 0){
                                            return <i className="fa fa-level-down"/>
                                        }else{
                                            return <i className="fa fa-level-up"/>
                                        }
                                    })()}
                                </div>
                                <small>Ingresos Totales</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label ingresosColor pull-right" >a la fecha</span>
                                <h5>Caja Dolar</h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">US$ {this.props.store.totalCajaDolar}</h1>
                                <div className="stat-percent font-bold text-navy">
                                    {(()=>{
                                        if(this.props.store.totalCajaDolar < 0){
                                            return <i className="fa fa-level-down"/>
                                        }else{
                                            return <i className="fa fa-level-up"/>
                                        }
                                    })()}
                                </div>
                                <small>Ingresos Totales</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Caja<small> SystemHC+ </small></h5>
                                <div className="ibox-tools inputGp">
                                    <div>
                                        <div className="input-group">
                                            <input type="text"
                                                   value={this.props.store.Moneda}
                                                   placeholder="Cambio"
                                                   onChange={(event)=>{
                                                       this.props.dispatch(action.insertMoney(event.target.value))
                                                   }}
                                                   className="input-sm form-control"/>
                                            <span className="input-group-btn">
                                                <button type="button"
                                                        onClick={()=>{
                                                            this.props.dispatch(action.updateDataGraphic(
                                                                this.props.store.chart,
                                                                this.props.store.dataCruda,
                                                                this.props.store.Moneda
                                                            ))
                                                        }}
                                                        className="btn btn-sm btn-primary">
                                                    <i className="fa fa-refresh"/>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ibox-content">
                                <div id="ChartCaja" style={{height:"250px"}}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Detalle de Caja<small> SystemHC+ </small></h5>
                            </div>
                            <div className="ibox-content">
                                <div style={{maxHeight:400,overflow:"auto"}}>
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Descripcion</th>
                                            <th>Ingreso</th>
                                            <th>Egreso</th>
                                            <th>pesos</th>
                                            <th>Dolares</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.store.tabla.map((item,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>{moment.utc(item.fecha).format("DD-MM-YYYY")}</td>
                                                    <td>{item.descripcion}</td>
                                                    <td>{item.ingreso == "1" ? `${item.icon}${item.importe}`:""}</td>
                                                    <td>{item.ingreso != "1" ? `${item.icon}${item.importe}`:""}</td>
                                                    <td>{item.hasOwnProperty("CajaPesos") ? `$${item.CajaPesos}`:""}</td>
                                                    <td>{item.hasOwnProperty("CajaDolar") ? `US$${item.CajaDolar}`:""}</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                                <div class="m-t-md">
                                    <small class="pull-right">
                                        <i class="fa fa-clock-o"> </i>
                                        Update on 16.07.2015
                                    </small>
                                    <small>
                                        <strong>Analysis of sales:</strong> The value has been changed over time, and last month reached a level over $50,000.
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}