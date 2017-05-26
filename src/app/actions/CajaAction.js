/**
 * Created by mc185249 on 5/7/2017.
 */
import request from '../Request/Request'
import moment from 'moment';

export function insertData(valor) {
    return {
        type:"LOAD_DATA_CAJA",
        value: valor
    }
}
export function insertChart(valor) {
    return {
        type:"LOAD_CHAR_CAJA",
        value: valor
    }
}
export function insertMoney(valor) {
    return {
        type:"INSERT_MONEY_CAJA",
        value: valor
    }
}
export function insertDataCruda(valor) {
    return {
        type:"LOAD_DATA_CRUDA_CAJA",
        value: valor
    }
}
export function insertTabla(valor) {
    return {
        type:"LOAD_TABLA_CAJA",
        value:{
            tabla:valor
        }
    }
}
export function updateDataGraphic(chart,data,money) {
    let newData = GenerarDataTable(data,money);
    DrawChart(newData,chart);
    return insertData(data)
}

export function DrawChart(data,chart) {
    var options = {
        title: '',
        colors: ['#1ab394', '#ed5565'],
        bar: {groupWidth: "50%"},
        hAxis: {
            title: '',
            format:"MMM-yy",
            ticks:data.ticks
        },
        vAxis: {
            title: ''
        }
    };
    chart.draw(data.data,options);
}

export function searchData(chart,money) {
    return function(dispatch) {
        request.get('http://localhost:3001/api/Caja')
            .then((result)=>{
                let data = GenerarDataTable(result.data.Graphic,money);
                DrawChart(data,chart);
                dispatch([
                    insertMoney(money),
                    insertDataCruda(result.data.Graphic),
                    insertData(data),
                    insertChart(chart),
                    insertTabla(result.data.tabla)
                ]);
            })
            .catch((err)=>{

            });
    }
}

function GenerarDataTable(list,cambioDolar) {
    try {
        var data = new window.google.visualization.DataTable();
        data.addColumn('date', 'Mes');
        data.addColumn('number', 'Ingreso');
        data.addColumn({ type: 'string', role: 'style'});
        data.addColumn('number', 'Egreso');
        data.addColumn({ type: 'string', role: 'style'});
        let dataTable = [];
        for (var i = 0; i < list.length; i++) {
            var row = [];
            let ingreso = 0;
            if(Array.isArray(list[i]["ingreso"])){
                list[i]["ingreso"].map((obj)=>{
                    ingreso = obj.Moneda == "58fecf3f3b2ef968436b332c" ? ingreso + (obj.total * cambioDolar) : ingreso + obj.total;
                });
            }
            row.push(moment(list[i]["fecha"]).toDate());
            row.push(ingreso);
            row.push("opacity: 0.8");
            row.push(list[i]["egreso"] * -1);
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
            ticks:ticks
        };

    }catch (err){
        console.log(err);
    }
}