import React from 'react';
import VerificarProp from '../componentCompartido/VerificarPropietario.jsx'
import DatosProp from '../componentCompartido/DatosPropietario.jsx';
import Formulario from './Formulario.jsx';
import { connect} from 'react-redux';
import {insertSocio} from '../../../../actions/FormAporteAction';
import {searchOwner,insertNumberDocumentSearch,LoadDataOwnerLabel,clearForm} from '../../../../actions/FormPropietarioAction'
@connect((store)=>{
    return {
        DataPersonal:store.DataLabelPersonal,
        FormOwner:store.FormOwner
    }
})
export default class Index extends React.Component{

    componentWillUnmount(){
        this.props.dispatch([
            LoadDataOwnerLabel(null),
            clearForm()
        ])
    }

    render(){
        return(
            <div>
                <div className="row">
                    <VerificarProp
                        dispatch={this.props.dispatch}
                        store={this.props.FormOwner}
                        btnSearch={()=>{
                            this.props.dispatch(searchOwner(this.props.FormOwner.numberDocumentSerach,insertSocio,1))
                        }}
                        onChangeNumDoc={(text)=>{
                            this.props.dispatch(insertNumberDocumentSearch(text));
                        }}
                    />
                    <DatosProp
                        store={this.props.DataPersonal}
                    />
                </div>
                <Formulario/>
            </div>
        )
    }
}