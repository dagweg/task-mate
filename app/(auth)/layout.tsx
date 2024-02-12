import Image from 'next/image'

export default function AuthLayout({ children, }: { children: React.ReactNode }) {
    return (
        <body className='w-screen h-screen'>
            <section className='w-full h-full flex items-center justify-center'>
                {children}
            </section>
        </body>
    )
}
