import React from "react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
    const goBack = useNavigate();

    return(
        <div id="backBtnNav">
            <button class="backBtn" onClick={() => goBack(-1)} style={{cursor: 'pointer'}}>Go Back</button>
        </div>
    )
}