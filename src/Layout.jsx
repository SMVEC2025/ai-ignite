import React from 'react'
import Navbar from './components/navbar/Index'
function Layout({ children }) {

    return (
        <>
            <Navbar />
           

            {children}
            {/* <Footer1 /> */}

        </>
    )
}

export default Layout
