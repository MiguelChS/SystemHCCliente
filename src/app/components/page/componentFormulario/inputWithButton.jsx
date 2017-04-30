import React from 'react';

export default (props)=>{
    let value = props.value ? props.value : "";
    let classRequire = "form-control";
    if(props.required && value.length == 0){
        classRequire = "form-control require-inv";
    }
    return(
        <div className="form-group">
            <label className="col-xs-12 col-sm-2 control-label">{props.label}</label>
            <div className="col-xs-12 col-sm-10">
                <div className="input-group">
                    <input type="text"
                           value={value}
                           onChange={(event)=>{
                               props.returnValue(event.target.value);
                           }}
                           className={classRequire}
                           placeholder={props.placeholder}/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary"
                                type="button"
                                onClick={()=>{
                                    props.btnClick();
                                }}
                        >
                            {props.btnLabel}
                        </button>
                    </span>
                </div>
            </div>
        </div>
    )
}