import React from 'react';
import * as page from '../../actions/routerAction';

function Collapse(event) {
    let a = null;
    if(event.target.children.length > 0){
        a = event.target
    }else {
        a = event.target.parentElement
    }
    let domIcono = a.children.length > 1 ? a.children[2] : a.children[0];
    if(domIcono.className.indexOf("fa-plus") != -1){
        domIcono.className = "fa fa-minus floatRight";
        a.nextElementSibling.style.display = "block";
    }else{
        domIcono.className = "fa fa-plus floatRight";
        a.nextElementSibling.style.display = "none";
    }
}

export default (props)=>{
    let display = props.store.showMenuLeft ? "block" : "none";
    return(
        <nav className="navbar-default navbar-static-side" style={{display:display}} role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element">
                                    <span>
                                        <img alt="image"
                                             className="img-circle"
                                             src="http://webapplayers.com/inspinia_admin-v2.7.1/img/profile_small.jpg" />
                                    </span>
                            <a className="dropdown-toggle" href="#">
                                        <span className="clear">
                                            <span className="block m-t-xs" style={{marginTop:"5px"}}>
                                                <strong className="font-bold">{`${props.store.DataUser.lastName} ${props.store.DataUser.name}`}</strong>
                                            </span>
                                            <span className="text-muted text-xs block" style={{marginTop:"2px"}}>
                                                {(()=>{
                                                    if(props.store.DataUser.admin){
                                                        return "Admin";
                                                    }else{
                                                        return "Socio";
                                                    }
                                                })()}
                                            </span>
                                        </span>
                            </a>
                        </div>
                    </li>
                    {(()=>{
                        if(props.store.DataUser.admin){
                           return[
                               <li key={3}>
                                   <a href="JavaScript:void(0)"
                                      onClick={()=>{
                                          props.dispatch(page.pageInicioProject())
                                      }}
                                   >
                                       <i className="fa fa-play"/>
                                       <span className="nav-label">Inicio Proyecto</span>
                                   </a>
                               </li>,
                               <li key={1}>
                                   <a href="JavaScript:void(0)"
                                      onClick={()=>{
                                          props.dispatch(page.pageUser())
                                      }}
                                   >
                                       <i className="fa fa-user"/>
                                       <span className="nav-label">Usuario</span>
                                   </a>
                               </li>,
                               <li key={2}>
                                   <a href="JavaScript:void(0)"
                                      onClick={()=>{
                                          props.dispatch(page.pageUnits())
                                      }}
                                   >
                                       <i className="fa fa-building"/>
                                       <span className="nav-label">Unidades</span>
                                   </a>
                               </li>

                           ]
                        }
                    })()}
                    <li>
                        <a href="JavaScript:void(0)"
                           onClick={(event)=>{
                               Collapse(event);
                           }}
                        >
                            <i className="fa fa-edit"/>
                            <span className="nav-label">Ingreso de datos</span>
                            <span className="fa fa-plus floatRight"/>
                        </a>
                        <ul className="nav second-level collapse">
                            <li>
                                <a href="JavaScript:void(0)"
                                   onClick={(event)=>{
                                       Collapse(event);
                                   }}
                                >
                                    Ingresos
                                    <span className="fa fa-plus floatRight"/>
                                </a>
                                <ul className="nav third-level collapse">
                                    <li>
                                        <a href="JavaScript:void(0)"
                                           onClick={()=>{
                                               props.dispatch(page.pageAporte())
                                           }}>Aporte</a>
                                    </li>
                                    <li>
                                        <a href="JavaScript:void(0)"
                                           onClick={()=>{
                                               props.dispatch(page.pageSale())
                                           }}
                                        >Venta</a>
                                    </li>
                                    <li>
                                        <a href="JavaScript:void(0)"
                                           onClick={()=>{
                                               props.dispatch(page.pagePago())
                                           }}
                                        >Pago</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="JavaScript:void(0)"
                                   onClick={()=>{
                                       props.dispatch(page.pageEgreso())
                                   }}>Egresos</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="JavaScript:void(0)"
                           onClick={(event)=>{
                               Collapse(event);
                           }}
                        >
                            <i className="fa fa-bar-chart"/>
                            <span className="nav-label">Dashboards</span>
                            <span className="fa fa-plus floatRight"/>
                        </a>
                        <ul className="nav second-level collapse">
                            <li>
                                <a href="JavaScript:void(0)"
                                   onClick={()=>{
                                       props.dispatch(page.pageCaja())
                                   }}>Caja</a>
                            </li>
                            <li>
                                <a href="JavaScript:void(0)"
                                   onClick={()=>{
                                       props.dispatch(page.pageCashFlow())
                                   }}>CashFlow</a>
                            </li>
                            <li>
                                <a href="JavaScript:void(0)">Tablero de resultado</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    )
}