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
export function insertTabla(valor) {
    return {
        type:"LOAD_TABLA_CAJA",
        value: valor.map((obj,index)=> {
            if(index == 0){
                if(obj.ingreso == "1"){
                    obj["result"] = obj.importe;
                }else{
                    obj["result"] = obj.importe * -1;
                }
            }else{
                if(obj.ingreso == "1"){
                    obj["result"] = valor[index-1].result + obj.importe;
                }else{
                    obj["result"] = valor[index-1].result - obj.importe;
                }
            }
            return obj;
        })
    }
}

export function DrawChart() {
    
}

export function searchData(chart) {
    /*let data = new google.visualization.DataTable();
    data.addColumn('date', 'Fecha');
    data.addColumn('number', 'Ingreso');
    data.addColumn('number', 'Egreso');
    //data.addRows(dataTable);*/
    var options = {
    };

    //chart.draw(data, options)
    return function(dispatch) {
        request.get('http://localhost:3001/api/Caja')
            .then((result)=>{
                var data = google.visualization.arrayToDataTable(GenerarDataTable(result.data.Graphic));
                chart.draw(data, options);
                dispatch([
                    insertChart(chart),
                    insertTabla(result.data.tabla)
                ])
            })
            .catch((err)=>{

            });
    }
}

function GenerarDataTable(list) {
    let dataTable = [['Year', 'Ingreso', 'Egreso']];
    for (var i = 0; i < list.length; i++) {
        var row = [];
        row.push(moment.utc(list[i]["fecha"]).format("YYYY-MM-DD"));
        row.push(list[i]["ingreso"]);
        row.push(list[i]["egreso"] * -1);
        dataTable.push(row);
    }
    return [
        ['fecha', 'ingreso', 'Egreso'],
        ['10-25-2017', 1000, -400],
        ['10-25-2017', 1170, -460],
        ['10-25-2017', 660, -1120],
        ['10-25-2017', 1030, -540]
    ];
}