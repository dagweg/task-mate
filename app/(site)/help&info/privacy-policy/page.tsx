import React from 'react'

function PrivacyPolicy() {
    return (
        <>
            <div className='p-5'>
                <h1 className='font-bold text-2xl '>Privacy and Policy.</h1>
            </div>
            <div className='flex flex-col gap-3'>
                <div className='bg-white rounded-md p-3 hover:outline outline-black outline-1 duration-150 ease-in-out'>
                    <div className='overflow-y-scroll'>
                        <section>
                            <p>Last Updated: 11/13/23</p>
                        </section>

                        <section>
                            <h2>1. Information We Collect</h2>
                            <p>1.1 Account Information: To provide you with access to Task Mate, we collect...</p>
                            <p>1.2 User Content: Task Mate allows you to create and manage tasks, collaborate with team members...</p>
                            <p>1.3 Usage Information: We collect information about how you interact with Task Mate...</p>
                        </section>

                        <section>
                            <h2>2. How We Use Your Information</h2>
                            <p>2.1 Providing and Improving Task Mate: We use your information to deliver, maintain, and enhance...</p>
                            <p>2.2 Communications: We may use your email address to send important notices, updates, and promotional material...</p>
                            <p>2.3 Collaboration Features: Your user content and collaboration data are processed to enable features such as task assignment...</p>
                        </section>

                        <section>
                            <h2>3. Information Sharing</h2>
                            <p>3.1 Third-Party Service Providers: We may share your information with third-party service providers...</p>
                            <p>3.2 Legal Compliance: We may disclose your information if required by law or in response to valid requests from public authorities...</p>
                        </section>

                        <section>
                            <h2>4. Data Security</h2>
                            <p>We take appropriate measures to protect your information from unauthorized access, disclosure, alteration, and destruction...</p>
                        </section>

                        <section>
                            <h2>5. Your Choices</h2>
                            <p>You can review, update, or delete your account information at any time by logging into Task Mate...</p>
                        </section>

                        <section>
                            <h2>6. Changes to this Privacy Policy</h2>
                            <p>We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons...</p>
                        </section>

                        <section>
                            <h2>7. Contact Us</h2>
                            <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:contact@email.com">contact@email.com</a>.</p>
                        </section>
                    </div>
                </div>
            </div >
        </>
    )
}

export default PrivacyPolicy