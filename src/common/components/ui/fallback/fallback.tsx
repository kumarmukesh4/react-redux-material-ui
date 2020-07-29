import React from 'react'

function Fallback(props: any) {
    const {noDataText} = props;
    return (
        <>
          <div>{noDataText}</div>  
        </>
    )
}

export default Fallback
