import React from 'react';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import './SideBar.css';

const SideBar = ({ Actions }) => {
    return (
        <div className='sidebar-container'>
            <ul>
                {Actions.map((ele, key) => (
                    <div className='actions' key={key}>
                        <li style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                        <AiOutlineUsergroupAdd/>
                        {ele.title}
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default SideBar;
