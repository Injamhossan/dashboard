import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-primary/5 p-10 text-center border border-gray-100">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-100">
          <AlertCircle size={40} className="text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-text-dark mb-4 font-outfit">Oops!</h1>
        <p className="text-text-gray font-medium mb-8">
          Sorry, an unexpected error has occurred.
        </p>
        <div className="bg-gray-50 rounded-2xl p-4 mb-8">
            <p className="text-xs font-mono text-text-gray italic">
                {error.statusText || error.message}
            </p>
        </div>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-primary-dark text-white px-8 py-3 rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-primary-dark/10"
        >
          <Home size={20} /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
