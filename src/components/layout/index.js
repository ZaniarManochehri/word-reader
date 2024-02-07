import Sidebar from '../sidebar';
import styles from './Layout.module.scss'

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
            <div className={styles.content}>
                {children}
                <Sidebar />
            </div>
        </div>
    )
}

export default Layout;