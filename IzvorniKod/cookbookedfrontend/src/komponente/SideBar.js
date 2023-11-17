import React from "react";
import "./SideBar.css"

function SideBar(){
    return (
        <div className="Meni">
            <ul className="KategorijeJela">
                <h4>Kategorije jela:</h4>
                <li><a>Kategorija primjer 1</a></li>
                <li><a>Kategorija primjer 2</a></li>
            </ul>
            <ul className="RegijaJela">
                <h4>Regije jela:</h4>
                <li><a>Regija primjer 1</a></li>
                <li><a>Regija primjer 2</a></li>
            </ul>
        </div>
    )
}

export default SideBar;