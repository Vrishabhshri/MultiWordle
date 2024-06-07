import React from 'react'

function ChooserWaiting() {

    const searchParams = new URLSearchParams(window.location.search);
    const roomID = searchParams.get('roomID');

    return (

        <div>ChooserWaiting</div>

    )

}

export default ChooserWaiting