/**
 * Created by mc185249 on 5/7/2017.
 */
import React from 'react';
import { connect } from 'react-redux'
import * as action from '../../../actions/cashFlowAction';
@connect((state)=>{
    return {
        store:state.cashFlow,
        cambioDolar:state.Layout.cambioDefault
    }
})
export default class index extends React.Component{
    componentDidMount(){
        var chart = new google.visualization.ComboChart(document.getElementById('ChartChasFlow'));
        this.props.dispatch(action.buscarData(chart,this.props.cambioDolar))
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <span className="label resultColor pull-right"/>
                                <span className="label resultColor pull-right">a la fecha</span>
                                <h5>Periodo de repago </h5>
                            </div>
                            <div className="ibox-content">
                                <h1 className="no-margins">{this.props.store.periodoR}</h1>
                                <div className="stat-percent font-bold text-success">
                                    <i className="fa fa-clock-o"/>
                                </div>
                                <small>periodo en el cual vas a empezar a recuperar la inversion</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>CashFlow<small> SystemHC+ </small></h5>
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
                                <div id="ChartChasFlow" style={{height:"400px"}}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}