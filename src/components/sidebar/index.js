import React, { useState } from 'react';
import styles from './Sidebar.module.scss'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={`${styles.sidebar} ${styles[isOpen ? 'open' : 'close']}`}>
            <i className={`fa-duotone fa-chevrons-left ${styles.icon} ${isOpen && styles.rotate}`} onClick={() => setIsOpen(!isOpen)}></i>
        </div>
    )
}

export default Sidebar;