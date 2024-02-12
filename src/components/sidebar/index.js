import React, { Fragment, useEffect, useState } from 'react';

import styles from './Sidebar.module.scss'

const Sidebar = ({ open, params, onChange, onChangeOpen }) => {

    const [isOpen, setIsOpen] = useState(open);
    const [parameters, setParameters] = useState({});

    useEffect(() => {
        setParameters(params);
    }, [params]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParameters({ ...parameters, [name]: value });
        onChange({ ...parameters, [name]: value });
    }

    const handleChangeSelect = (e) => {
        const { value, name } = e.target;
        setParameters({ ...parameters, [name]: value });
        onChange({ ...parameters, [name]: value });
    }

    useEffect(() => {
        setIsOpen(open)
    }, [open])

    useEffect(() => {
        onChangeOpen(isOpen)
    }, [isOpen])


    return (
        <div className={`${styles.sidebar} ${styles[isOpen ? 'open' : 'close']}`} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
                {isOpen && <span>تنظیمات</span>}
                <i className={`fa-duotone fa-chevrons-left ${styles.icon} ${isOpen && styles.rotate}`} onClick={() => setIsOpen(!isOpen)}></i>
            </div>
            <div className={isOpen && styles.divider} />
            {isOpen && <Fragment>
                <div className={styles.item}>
                    <label>padding</label>
                    <div className={styles.row}>
                        <input type="number" min={0} placeholder='top' value={parameters?.paddingTop || ""} onChange={handleChange} name='paddingTop' />
                        <input type="number" min={0} placeholder='right' value={parameters?.paddingRight || ""} onChange={handleChange} name='paddingRight' />
                    </div>
                    <div className={styles.row}>
                        <input type="number" min={0} placeholder='bottom' value={parameters?.paddingBottom || ""} onChange={handleChange} name='paddingBottom' />
                        <input type="number" min={0} placeholder='left' value={parameters?.paddingLeft || ""} onChange={handleChange} name='paddingLeft' />
                    </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.item}>
                    <label>Text Color</label>
                    <input type="text" placeholder='example: #000000 or red' value={parameters?.color || ""} name='color' onChange={handleChange} />
                </div>
                <div className={styles.divider} />
                <div className={styles.item}>
                    <label>Text Align</label>
                    <select name="textAlign" id="textAlign" value={parameters?.textAlign} onChange={handleChangeSelect}>
                        <option value="center">center</option>
                        <option value="right">right</option>
                        <option value="left">left</option>
                    </select>
                </div>
                <div className={styles.divider} />
                <div className={styles.item}>
                    <div className={styles.itemTitleContainer}>
                        <label>PDF Quality</label>
                        <span className={styles.itemDesc}>By changing the values in this section, you can have output with different size and quality</span>
                    </div>
                    <div className={styles.qualityRow}>
                        <div className={styles.itemElementContainer}>
                            <label>Quality</label>
                            <input step='0.1' min={0.1} max={1} type="number" name='quality' value={parameters.quality || ""} onChange={handleChange} placeholder='A number between 0 and 1' />
                        </div>
                        <div className={styles.itemElementContainer}>
                            <label>Scale</label>
                            <input type="number" step='0.1' max={5} name='scale' value={parameters.scale || ""} onChange={handleChange} placeholder='example: 2' />
                        </div>
                    </div>
                </div>
            </Fragment>}
        </div>
    )
}

export default Sidebar;