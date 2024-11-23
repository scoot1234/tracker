import React from "react";

export default function Nav(){
    return(
        <div className='Home' style={{border:'7px', backgroundColor:'#6ABDEF'}}>
            <a href='./' style={{textDecoration:'none', color:'black', fontFamily:'cursive', marginRight:'20%',marginLeft:'19%',fontSize:'40px'}}>Home</a>
            <a href='./input' style={{textDecoration:'none', color:'black', fontFamily:'cursive', marginRight:'10%', marginLeft:'6%',fontSize:'40px'}}>Input</a>
            <a href='./reminder' style={{textDecoration:'none', color:'black', fontFamily:'cursive',fontSize:'40px',marginLeft:'10%'}}>Reminder</a>
        </div>
    )
}