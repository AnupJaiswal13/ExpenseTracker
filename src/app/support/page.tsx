export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-xl text-gray-600">We're here to help you with your expense tracker</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get Started</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Setting up your account</h3>
              <p className="text-gray-600">
                Click the "Sign In" button on the login page to create your account or sign in with an existing one. 
                We support various authentication providers for your convenience.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tracking expenses</h3>
              <p className="text-gray-600">
                Once logged in, you can start tracking your expenses, categorize them, and view detailed reports 
                of your spending patterns.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Need help?</h3>
              <p className="text-gray-600">
                If you have any questions or need assistance, please contact our support team at{' '}
                <a href="mailto:support@expensetracker.com" className="text-blue-600 hover:underline">
                  support@expensetracker.com
                </a>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 