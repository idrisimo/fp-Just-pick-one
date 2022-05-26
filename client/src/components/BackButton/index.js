import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"

export function BackButton() {
    const goBack = useNavigate();

    return(
        <div id="backBtnNav">
            <button className="backBtn" onClick={() => goBack(-1)} style={{cursor: 'pointer'}}>Go Back</button>
        </div>
    )
}
