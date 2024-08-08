import React from 'react';
import { getIcon } from '../../assets/icons';
import './SideBar.css';

const SideBar = ({ Actions, handleActionClick }) => {
    return (
        <div className='sidebar-container'>
            <ul>
                {Actions.map((ele, key) =>{
                    const IconComponent = getIcon(ele.title);
                    return (<div className='actions' key={key} onClick={() => handleActionClick(ele.title)}>
                        <li style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                            {IconComponent && <IconComponent size="30"/>}
                        {ele.title}
                        </li>
                    </div>);
                })}
            </ul>
        </div>
    );
};

export default SideBar;
