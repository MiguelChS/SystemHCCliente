/**
 * Created by mc185249 on 5/25/2017.
 */
import Request from '../Request/Request';
import { changeRequest } from './LayoutAction';
import moment from 'moment';

export function buscarData(chart,money){
    return [
        changeRequest(true),
        insertMoney(money),
        searchData(chart,money)
    ]
}

export function loadData(valor) {
    return {
        type:"LOAD_DATA_CASH_FLOW",
        value:valor
    }
}
export function insertDataCruda(valor) {
    return {
        type:"LOAD_DATA_CRUDA_CASH_FLOW",
        value:valor
    }
}
export function insertMoney(valor) {
    return {
        type:"INSERT_MONEY_CASH_FLOW",
        value:valor
    }
}

export function insertChart(valor) {
    return {
        type:"LOAD_CHAR_CASH_FLOW",
        value:valor
    }
}

function searchData(chart,money) {
    return (dispatch)=>{
        Request.get('http://localhost:3001/api/cashFlow')
            .then((result)=>{
                let data = GenerarDataTable(result.data,money);
                DrawChart(data,chart);
                dispatch([
                    changeRequest(false),
                    loadData(data),
                    insertChart(chart),
                    insertDataCruda(result.data)
                ])
            })
            .catch((err)=>{
                dispatch([
                    changeRequest(false)
                ])
            });
    }
}
export function DrawChart(data,chart) {
    let options = {
        colors: ['#1c84c6','#1ab394','#1ab394', '#ed5565', '#ed5565','#f8ac59'],
        hAxis: {title: 'Month'},
        seriesType: 'bars',
        series: {5: {type: 'line'}}
    };
    chart.draw(data.data,options);
}

export function updateDataGraphic(chart,data,money) {
    let newData = GenerarDataTable(data,money);
    DrawChart(newData,chart);
    return loadData(newData)
}

function GenerarDataTable(list,cambioDolar) {
    try {
        var data = new window.google.visualization.DataTable();
        data.addColumn('date', 'Mes');
        data.addColumn('number', 'Inversion');
        data.addColumn({ type: 'string', role: 'style'});
        data.addColumn('number', 'Ingreso Estimado');
        data.addColumn({ type: 'string', role: 'style'});
        data.addColumn('number', 'Ingreso Real');
        data.addColumn({ type: 'string', role: 'style'});
        data.addColumn('number', 'Egreso Estimado');
        data.addColumn({ type: 'string', role: 'style'});
        data.addColumn('number', 'Egreso Real');
        data.addColumn({ type: 'string', role: 'style'});
        data.addColumn('number', 'flujo de Fondo');
        data.addColumn({ type: 'string', role: 'style'});
        let flujoFondo = 0;
        let PeriodoReintegro = '';
        let first = true;
        let dataTable = [];
        for (var i = 0; i < list.length; i++) {
            var row = [];
            let inversion = 0;
            let ingresoR = 0;
            if(Array.isArray(list[i]["ingresoR"])){
                list[i]["ingresoR"].map((obj)=>{
                    ingresoR = obj.Moneda == "58fecf3f3b2ef968436b332c" ? ingresoR + (obj.total * cambioDolar) : ingresoR + obj.total;
                });
            }
            if(Array.isArray(list[i]["inversion"])){
                list[i]["inversion"].map((obj)=>{
                    inversion = (obj.Moneda == "58fecf3f3b2ef968436b332c" ? inversion + (obj.total * cambioDolar) : inversion + obj.total) * -1;
                });
            }
            let costo = (list[i]["costoR"] == 0 ? list[i]["costoEs"] : list[i]["costoR"]) * -1;
            let ingreso = ingresoR == 0 ?  list[i]["ingresoEs"] : ingresoR;
            flujoFondo = (flujoFondo + inversion + costo) + ingreso;
            if(flujoFondo > 0 && first) {
                PeriodoReintegro = moment(list[i]["fecha"]).format("MM-YYYY");
                first = false;
            }
            row.push(moment(list[i]["fecha"]).toDate());
            row.push(inversion);
            row.push("opacity: 0.8");
            row.push(list[i]["ingresoEs"]);
            row.push("opacity: 0.8");
            row.push(ingresoR);
            row.push("opacity: 0.8");
            row.push(list[i]["costoEs"] * -1);
            row.push("opacity: 0.8");
            row.push(list[i]["costoR"] * -1);
            row.push("opacity: 0.8");
            //flujo de fondo
            row.push(flujoFondo);
            row.push("opacity: 0.8");
            dataTable.push(row);
        }
        //ferificamos si son  1 2 3 en caso contrario null,
        let ticks;
        switch (list.length){
            case 1:{
                ticks = [moment(list[0]["fecha"]).toDate()];
                break;
            }
            case 2:{
                ticks = [moment(list[0]["fecha"]).toDate(),moment(list[1]["fecha"]).toDate()];
                break;
            }
            case 3:{
                ticks = [moment(list[0]["fecha"]).toDate(),
                    moment(list[1]["fecha"]).toDate(),
                    moment(list[2]["fecha"]).toDate()];
                break;
            }
            default:
                ticks = null;
        }

        data.addRows(dataTable);
        return {
            data:data,
            ticks:ticks,
            periodoReintegro: PeriodoReintegro
        };

    }catch (err){
        console.log(err);
    }
}
/*var data = google.visualization.arrayToDataTable([
 ['Month', 'Capital', 'ingreso', 'egreso', 'flujo de Fondo'],
 ['01-17',,-138888.888-5000000,305555.555555556888889,-4833333.33333333],
 ['02-17',0,305555.555555556,-138888.888888889,-4666666.66666667],
 ['03-17',0,305555.555555556,-138888.888888889,-4500000],
 ['04-17',0,305555.555555556,-138888.888888889,-4333333.33333333],
 ['05-17',0,305555.555555556,-138888.888888889,-4166666.66666667],
 ['06-17',0,305555.555555556,-138888.888888889,-4000000],
 ['07-17',0,305555.555555556,-138888.888888889,-3833333.33333333],
 ['08-17',0,305555.555555556,-138888.888888889,-3666666.66666667],
 ['09-17',0,305555.555555556,-138888.888888889,-3500000],
 ['10-17',0,305555.555555556,-138888.888888889,-3333333.33333333],
 ['11-17',0,305555.555555556,-138888.888888889,-3166666.66666667],
 ['12-17',0,305555.555555556,-138888.888888889,-3000000],
 ['01-18',0,305555.555555556,-138888.888888889,-2833333.33333333],
 ['02-18',-400000,305555.555555556,-138888.888888889,-3066666.66666667],
 ['03-18',0,305555.555555556,-138888.888888889,-2900000],
 ['04-18',0,305555.555555556,-138888.888888889,-2733333.33333333],
 ['05-18',0,305555.555555556,-138888.888888889,-2566666.66666667],
 ['06-18',0,305555.555555556,-138888.888888889,-2400000],
 ['07-18',0,305555.555555556,-138888.888888889,-2233333.33333333],
 ['08-18',0,305555.555555556,-138888.888888889,-2066666.66666667],
 ['09-18',0,305555.555555556,-138888.888888889,-1900000],
 ['10-18',0,305555.555555556,-138888.888888889,-1733333.33333333],
 ['11-18',0,305555.555555556,-138888.888888889,-1566666.66666667],
 ['12-18',0,305555.555555556,-138888.888888889,-1400000],
 ['01-19',0,305555.555555556,-138888.888888889,-1233333.33333334],
 ['02-19',0,305555.555555556,-138888.888888889,-1066666.66666667],
 ['03-19',0,305555.555555556,-138888.888888889,-900000.000000002],
 ['04-19',0,305555.555555556,-138888.888888889,-733333.333333336],
 ['05-19',0,305555.555555556,-138888.888888889,-566666.666666669],
 ['06-19',0,305555.555555556,-138888.888888889,-400000.000000003],
 ['07-19',0,305555.555555556,-138888.888888889,-233333.333333336],
 ['08-19',0,305555.555555556,-138888.888888889,-66666.6666666696],
 ['09-19',0,305555.555555556,-138888.888888889,99999.999999997],
 ['10-19',0,305555.555555556,-138888.888888889,266666.666666664],
 ['11-19',0,305555.555555556,-138888.888888889,433333.33333333],
 ['12-19',0,305555.555555556,-138888.888888889,599999.999999997],
 ]);

 var options = {
 title : 'Evolución de cashFlow',
 vAxis: {title: '$'},
 hAxis: {title: 'Month'},
 seriesType: 'bars',
 series: {3: {type: 'line'}}
 };

 var chart = new google.visualization.ComboChart(document.getElementById('ChartChasFlow'));
 chart.draw(data, options);*/