import React from 'react';
import { useNavigate } from 'react-router-dom';


export function NavButton ({path,value}){
  const navigateTo = useNavigate();

  return(
      <div id="navBtnDiv">
      <button className='navBtn'  id="NavButton" onClick={() => navigateTo(path)} style={{ cursor: 'pointer' }}>{value}</button>
      </div>
  ) 
}