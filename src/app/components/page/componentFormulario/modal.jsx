import React from 'react';
import {Modal} from 'react-bootstrap';

export default (props)=>{
    let size = null;
    let classXl = "";
    if(props.store.size == "xl"){
        classXl = "modal-xl modal-lg"
    }else{
        size = props.store.size;
    }
    console.log(props);
    return(
        <Modal show={true}
               backdrop="static"
               dialogClassName={`sinBordeModal ${classXl}`}
               bsSize={size}
        >
            <Modal.Body>
                <props.store.body
                    idModal={props.store.id}
                    data={props.store.data}
                />
            </Modal.Body>
        </Modal>
    )
}