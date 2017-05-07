import React from 'react';
import FormVenta from './Formulario.jsx';
import DetalleUnidad from '../componentCompartido/DetalleUnidad';
import DetalleVenta from '../componentCompartido/DetalleVenta';
import VerificarProp from '../componentCompartido/VerificarPropietario.jsx'
import DatosProp from '../componentCompartido/DatosPropietario.jsx';
import { connect} from 'react-redux';
import {searchUnits,insertOwner} from '../../../../actions/FormVentaAction';
import { insertNumberDocumentSearch,searchOwner,LoadDataOwnerLabel,clearForm } from '../../../../actions/FormPropietarioAction';
import FormProp from './FormPropietario.jsx';
import { addModal } from '../../../../actions/modalAction';
@connect((store)=>{
    return {
        DataPersonal:store.DataLabelPersonal,
        FormOwner:store.FormOwner,
        Units:store.Source.Units,
        store:store.FormSale
    }
})
export default class Index extends React.Component{

    componentWillUnmount(){
        this.props.dispatch([
            LoadDataOwnerLabel(null),
            clearForm()
        ])
    }
    componentDidMount(){
        this.props.dispatch(searchUnits())
    }

    render(){
        return(
            <div>
                <div className="row">
                    <VerificarProp
                        dispatch={this.props.dispatch}
                        store={this.props.FormOwner}
                        btnSearch={()=>{
                            this.props.dispatch(searchOwner(this.props.FormOwner.numberDocumentSerach,insertOwner,2))
                        }}
                        onChangeNumDoc={(text)=>{
                            this.props.dispatch(insertNumberDocumentSearch(text));
                        }}
                        onClickNewProp={()=>{
                            this.props.dispatch(addModal({
                                body:FormProp,
                                data:null,
                                size:"lg"}))
                        }}
                    />
                    <DatosProp
                        store={this.props.DataPersonal}
                    />
                </div>
                <div className="row">
                    <FormVenta/>
                    <div className="col-xs-12 col-md-4">
                        <DetalleUnidad
                            store={this.props.store.idUnidad}
                        />
                        <DetalleVenta
                            store={this.props.store}
                        />
                    </div>


                </div>
            </div>
        )
    }
}