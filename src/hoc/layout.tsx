import React from 'react'

import Header from '../shared/header/header'

 function Layout(Props: any) {
    return (
        <>
            <div className="main-container">
                <div><Header /></div>
                <div className="content-container">
                    {Props.children}
                </div>
            </div>
        </>
    )
}

export default Layout;
