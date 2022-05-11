import * as React from 'react';

const Layout = ({children}: React.PropsWithChildren<any>) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;