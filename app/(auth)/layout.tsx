import Image from 'next/image'

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
    return (
        <body>
            <section className='grid grid-cols-1 md:grid-cols-2'>

                <div className="body col-span-1 w-full min-h-screen ">
                    {children}
                </div>

                <div className="imagecover relative hidden md:flex col-span-1 w-full min-h-screen">
                    {/* <Image src={"https://wallpapershome.com/images/pages/pic_h/15590.jpg"} alt="cover Image" objectFit='cover' layout='fill' /> */}
                    <Image className='z-0 relative' src={'https://i.imgur.com/nr21eDd.jpg'} alt='project' objectFit='cover' layout='fill'></Image>
                    <div className='z-10 flex flex-col items-center w-full h-full justify-center bg-slate-800 bg-opacity-90'>
                        {/* <h1 style={{ fontFamily: 'Gasoek One', transformOrigin: 'left' }} className=' fixed text-[72px] scale-x-105 tracking-wide text-slate-200'>Task Mate<span className='text-2xl'>&trade;</span></h1> */}
                        <h1 style={{ fontFamily: 'Gasoek One', transformOrigin: 'left' }} className='text-[74px] tracking-wide text-white '>Task Mate<span className='text-2xl'>&trade;</span></h1>
                    </div>
                    {/* <div className=''>
                    </div> */}
                </div>
            </section>
        </body>
    )
}
