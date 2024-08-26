import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Loader = () => {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white/1  backdrop-blur-sm z-50">
                <div className="relative">
                    <ThreeCircles
                        height={80}
                        width={80}
                        // color="#4fa94d"
                        color="#000"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            </div>
        </>
    )
}

export default Loader
