import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from 'pages';
import { Layout } from 'components';

export const routes = {
    ROOT: '/',
};

const Routers = () => {
    const pages = [
        {
            path: routes.ROOT,
            component: <Home />,
            title: '',
            isHome: true,
            isNavigate: true,
        },
    ];

    return (
        <BrowserRouter>
            <Routes>
                {pages.map((item) => (
                    <Route
                        path={item.path}
                        key={item.path}
                        exact
                        element={<Layout>{item.component}</Layout>}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;