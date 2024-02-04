import Image from 'next/image'

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
    return (
        <body>
            <section className=''>

                <div className='fixed w-full h-full z-10 flex items-center justify-center'>
                    {children}
                </div>

                <div className="z-0 imagecover relative md:flex  lg:block col-span-1 w-full min-h-screen ">
                    <Image className='z-0 !fixed' src={'https://i.imgur.com/nr21eDd.jpg'} alt='project' objectFit='cover' layout='fill' ></Image>
                    {/* <div className='z-10 flex flex-col items-center w-full h-full justify-center bg-slate-800 bg-opacity-90'>
                        <h1 style={{ fontFamily: 'Gasoek One', transformOrigin: 'left' }} className='text-[74px] tracking-wide text-white '>Task Mate<span className='text-2xl'>&trade;</span></h1>
                    </div> */}
                </div>
            </section>
        </body>
    )
}
