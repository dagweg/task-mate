import React from 'react'

function Panel({ text }: { text: string }) {
    return (
        <div className='bg-dark2 w-fit text-white text-xs py-2 px-5 rounded-full my-3 hover:scale-95 duration-200 cursor-pointer'>
            {text}
            <i></i>
        </div>
    )
}

export default Panel