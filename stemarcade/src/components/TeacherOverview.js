import React from 'react';
import ArcadeOutline from "./ArcadeOutline";

export default function TeacherOverview(){
    return(
        <ArcadeOutline style = {{display:"flex", justifyContent: "center", alignItems: "center"}}>
            <div className = "screen">
                <h1>Teacher Overview</h1>
            </div>
        </ArcadeOutline>
    )
}
