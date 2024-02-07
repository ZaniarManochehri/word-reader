import Sidebar from '../sidebar';
import React, { useState, cloneElement, isValidElement, Children } from 'react';
import styles from './Layout.module.scss'

const Layout = ({ children }) => {
    const [params, setParams] = useState({
        paddingTop: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        color: '#000000',
        textAlign: 'left',
    });

    const childrenWithProps = Children.map(children, child => {
        if (isValidElement(child)) {
            return cloneElement(child, { params });
        }
        return child;
    });

    return (
        <div className={styles.layout}>
            <div className={styles.content}>
                {childrenWithProps}
                <Sidebar onChange={(params) => setParams(params)} params={params} />
            </div>
        </div>
    )
}

export default Layout;