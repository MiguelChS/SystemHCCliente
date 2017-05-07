/**
 * Created by mc185249 on 5/7/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as action from '../../../actions/CajaAction';
import moment from 'moment';

@connect((store)=>{
    return{
        store:store.Caja
    }
})
export default class Caja extends React.Component{

    componentDidMount(){
        let chart = new window.google.charts.Bar(document.getElementById("ChartCaja"));
        this.props.dispatch(action.searchData(chart));
    }

    render(){
        let precio = this.props.store.tabla[this.props.store.tabla.length - 1] ? this.props.store.tabla[this.props.store.tabla.length - 1].result : "";
        return(
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-content">
                                <div>
                                    <h1 className="m-b-xs">${precio}</h1>
                                    <h3 className="font-bold no-margins">
                                        Resultado de caja a la fecha
                                    </h3>
                                </div>

                                <div id="ChartCaja" style={{height:"500px"}}>
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
                                            <th>#</th>
                                            <th>Fecha</th>
                                            <th>Descripcion</th>
                                            <th>Ingreso</th>
                                            <th>Egreso</th>
                                            <th>Resultado</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.store.tabla.map((item,index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td>{index}</td>
                                                    <td>{moment.utc(item.fecha).format("DD-MM-YYYY")}</td>
                                                    <td>{item.descripcion}</td>
                                                    <td>{item.ingreso == "1" ? item.importe:""}</td>
                                                    <td>{item.ingreso != "1" ? item.importe:""}</td>
                                                    <td>{item.result}</td>
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