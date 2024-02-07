import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss'

const Sidebar = ({ params, onChange }) => {

    const [isOpen, setIsOpen] = useState(true);
    const [parameters, setParameters] = useState({});

    useEffect(() => {
        setParameters(params);
    }, [params]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParameters({ ...parameters, [name]: value });
        onChange({ ...parameters, [name]: value });
    }

    const handleChangeTextAlign = (e) => {
        const { value } = e.target;
        setParameters({ ...parameters, textAlign: value });
        onChange({ ...parameters, textAlign: value });
    }

    return (
        <div className={`${styles.sidebar} ${styles[isOpen ? 'open' : 'close']}`}>
            <div className={styles.header}>
                <i className={`fa-duotone fa-chevrons-left ${styles.icon} ${isOpen && styles.rotate}`} onClick={() => setIsOpen(!isOpen)}></i>
                {isOpen && <span>تنظیمات</span>}
            </div>
            <div className={isOpen && styles.divider} />
            <div className={styles.item}>
                <label>padding</label>
                <div className={styles.row}>
                    <input type="number" placeholder='top' value={parameters?.paddingTop || ""} onChange={handleChange} name='paddingTop' />
                    <input type="number" placeholder='right' value={parameters?.paddingRight || ""} onChange={handleChange} name='paddingRight' />
                </div>
                <div className={styles.row}>
                    <input type="number" placeholder='bottom' value={parameters?.paddingBottom || ""} onChange={handleChange} name='paddingBottom' />
                    <input type="number" placeholder='left' value={parameters?.paddingLeft || ""} onChange={handleChange} name='paddingLeft' />
                </div>
            </div>
            <div className={isOpen && styles.divider} />
            <div className={styles.item}>
                <label>Text Color</label>
                <input type="text" placeholder='example: #000000 or red' value={parameters?.color || ""} name='color' onChange={handleChange} />
            </div>
            <div className={isOpen && styles.divider} />
            <div className={styles.item}>
                <label>Text Align</label>
                <select name="textAlign" id="textAlign" value={parameters?.textAlign} onChange={handleChangeTextAlign}>
                    <option value="center">center</option>
                    <option value="right">right</option>
                    <option value="left">left</option>
                </select>
            </div>
            <div className={isOpen && styles.divider} />
        </div>
    )
}

export default Sidebar;