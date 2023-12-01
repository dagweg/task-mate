import Image from 'next/image'

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
    return (
        <body>
            <section className='grid grid-cols-1 md:grid-cols-2'>

                <div className="body col-span-1 w-full min-h-screen ">
                    {children}
                </div>

                <div className="imagecover relative hidden md:flex col-span-1 w-full min-h-screen">
                    <Image src={"https://wallpapershome.com/images/pages/pic_h/15590.jpg"} alt="cover Image" objectFit='cover' layout='fill' />
                </div>
            </section>
        </body>
    )
}