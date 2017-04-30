import React from 'react';
import FormVenta from './Formulario.jsx';
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
        Units:store.Source.Units
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
                            this.props.dispatch(searchOwner(this.props.FormOwner.numberDocumentSerach,insertOwner,false))
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
                <FormVenta/>
            </div>
        )
    }
}