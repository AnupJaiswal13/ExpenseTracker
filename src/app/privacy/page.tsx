export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed">
                We collect information you provide directly to us, such as when you create an account, 
                add expense records, or contact us for support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="text-gray-600 leading-relaxed list-disc pl-6 space-y-2">
                <li>To provide and maintain our expense tracking service</li>
                <li>To process and store your expense data securely</li>
                <li>To communicate with you about your account</li>
                <li>To improve our services and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized 
                access, alteration, disclosure, or destruction. Your data is encrypted both in transit and at rest.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed">
                We use Auth0 for authentication services. Please review Auth0's privacy policy to understand 
                how they handle your authentication data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-600 leading-relaxed">
                You have the right to access, update, or delete your personal information. You can also 
                request a copy of your data or ask us to stop processing your information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@expensetracker.com" className="text-blue-600 hover:underline">
                  privacy@expensetracker.com
                </a>
              </p>
            </section>

            <section>
              <p className="text-sm text-gray-500 mt-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
            >
              ← Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 