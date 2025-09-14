export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using this expense tracking application, you accept and agree to be bound by the 
                terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-600 leading-relaxed">
                Permission is granted to temporarily use this application for personal, non-commercial transitory viewing only. 
                This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Privacy and Data</h2>
              <p className="text-gray-600 leading-relaxed">
                We are committed to protecting your privacy. Your expense data is stored securely and will not be 
                shared with third parties without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. User Responsibilities</h2>
              <p className="text-gray-600 leading-relaxed">
                Users are responsible for maintaining the confidentiality of their account information and for all 
                activities that occur under their account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@expensetracker.com" className="text-blue-600 hover:underline">
                  legal@expensetracker.com
                </a>
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