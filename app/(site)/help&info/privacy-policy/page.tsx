import React from "react";

function PrivacyPolicy() {
  return (
    <>
      <div className="p-5">
        <h1 className="font-bold text-2xl ">Privacy and Policy.</h1>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-white rounded-md p-3 hover:outline outline-black outline-1 duration-150 ease-in-out">
          <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-2">
              1. Information We Collect
            </h2>
            <p className="mb-4">
              <span className="font-bold">1.1 Account Information:</span> To
              provide you with access to Task Mate, we collect account
              information.
            </p>
            <p className="mb-4">
              <span className="font-bold">1.2 User Content:</span> Task Mate
              allows you to create and manage tasks, collaborate with team
              members, etc.
            </p>
            <p className="mb-4">
              <span className="font-bold">1.3 Usage Information:</span> We
              collect information about how you interact with Task Mate.
            </p>

            <h2 className="text-xl font-bold mb-2">
              2. How We Use Your Information
            </h2>
            <p className="mb-4">
              <span className="font-bold">
                2.1 Providing and Improving Task Mate:
              </span>{" "}
              We use your information to deliver, maintain, and enhance Task
              Mate.
            </p>
            <p className="mb-4">
              <span className="font-bold">2.2 Communications:</span> We may use
              your email address to send important notices, updates, and
              promotional material.
            </p>
            <p className="mb-4">
              <span className="font-bold">2.3 Collaboration Features:</span>{" "}
              Your user content and collaboration data are processed to enable
              features such as task assignment.
            </p>

            <h2 className="text-xl font-bold mb-2">3. Information Sharing</h2>
            <p className="mb-4">
              <span className="font-bold">
                3.1 Third-Party Service Providers:
              </span>{" "}
              We may share your information with third-party service providers.
            </p>
            <p className="mb-4">
              <span className="font-bold">3.2 Legal Compliance:</span> We may
              disclose your information if required by law or in response to
              valid requests from public authorities.
            </p>

            <h2 className="text-xl font-bold mb-2">4. Data Security</h2>
            <p className="mb-4">
              We take appropriate measures to protect your information from
              unauthorized access, disclosure, alteration, and destruction.
            </p>

            <h2 className="text-xl font-bold mb-2">5. Your Choices</h2>
            <p className="mb-4">
              You can review, update, or delete your account information at any
              time by logging into Task Mate.
            </p>

            <h2 className="text-xl font-bold mb-2">
              6. Changes to this Privacy Policy
            </h2>
            <p className="mb-4">
              We may update this Privacy Policy to reflect changes in our
              practices or for other operational, legal, or regulatory reasons.
            </p>

            <h2 className="text-xl font-bold mb-2">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at{" "}
              <a href="mailto:contact@email.com">contact@email.com</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
