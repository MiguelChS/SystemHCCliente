/**
 * Created by mc185249 on 5/26/2017.
 */
import React from 'react';

export default (props)=>{
    return(
        <button className="btn btn-xs btn-primary separarButton"
                onClick={()=>{
                    props.onClick(props.data)
                }}>
            <i className={`fa ${props.icono}`}/>
        </button>
    )
}