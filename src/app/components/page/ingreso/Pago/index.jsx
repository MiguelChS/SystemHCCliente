import React from 'react';
import DetalleUnidad from '../componentCompartido/DetalleUnidad';
import VerificarProp from '../componentCompartido/VerificarPropietario.jsx'
import DatosProp from '../componentCompartido/DatosPropietario.jsx';
import Formulario from './Formulario';
import { connect} from 'react-redux';
import { insertNumberDocumentSearch,searchOwner,LoadDataOwnerLabel,clearForm } from '../../../../actions/FormPropietarioAction';
@connect((store)=>{
    return {
        DataPersonal:store.DataLabelPersonal,
        FormOwner:store.FormOwner,
        store:store.FormPago
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
                            this.props.dispatch(searchOwner(this.props.FormOwner.numberDocumentSerach,()=>{},3))
                        }}
                        onChangeNumDoc={(text)=>{
                            this.props.dispatch(insertNumberDocumentSearch(text));
                        }}
                    />
                    <DatosProp
                        store={this.props.DataPersonal}
                    />
                </div>
                <div className="row">
                    <Formulario/>
                    <div className="col-xs-12 col-md-4">
                        <DetalleUnidad
                            store={this.props.store.idVenta ? this.props.store.idVenta.unidad : null}
                        />
                    </div>
                </div>
            </div>
        )
    }
}