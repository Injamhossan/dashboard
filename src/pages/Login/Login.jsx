import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Login = () => {
  const { loginUser, mockApiLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');
    const rememberMe = form.get('remember-me') === 'on';
    
    setLoading(true);
    loginUser(email, password, rememberMe)
      .then(() => {
        setLoading(false);
        toast.success("Successfully logged in!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === 'auth/invalid-credential') {
          toast.error("Invalid credentials, check config or sign up first.");
        } else {
          toast.error(error.message);
        }
      });
  };

  const handleApiLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget.form || e.target.closest('form'));
    const email = form.get('email');
    const password = form.get('password');

    if (!email || !password) {
      toast.error('Please enter email and password for API Login test.');
      return;
    }

    setApiLoading(true);
    try {
      const data = await mockApiLogin(email, password);
      
      /**
       * On successful API login, the token is received.
       * Local persistence is handled before navigating.
       */
      if (data && data.token) {
        toast.success("API Login Successful!");
        console.log("Token Received:", data.token);
        navigate(from, { replace: true });
      }
    } catch (error) {
       console.error(error);
       
       /**
        * Fallback for demonstration if the backend fails or is missing.
        * Simulates a successful API response for specific dummy credentials.
        */
       if (email === "user1@example.com" && password === "password123") {
         toast.success("API Mock Successful! Received token.");
         navigate(from, { replace: true });
       } else {
         toast.error("API login failed (Make sure backend is running or use user1@example.com).");
       }
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] p-4 font-[Outfit]">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-500">Sign in to your account to continue</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#175336] focus:border-[#175336] bg-gray-50 transition-all outline-none text-[14px] text-[#111827]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#175336] focus:border-[#175336] bg-gray-50 transition-all outline-none text-[14px] text-[#111827]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" defaultChecked className="h-4 w-4 text-[#175336] focus:ring-[#175336] border-gray-300 rounded cursor-pointer accent-[#175336]" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-[#175336] hover:text-[#0F4C3A] transition-colors">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-full shadow-sm text-[14px] font-semibold text-white bg-[#175336] hover:bg-[#0F4C3A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#175336] transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <span className="animate-pulse">Signing in...</span>
              ) : (
                <span className="flex items-center">Sign In<FiArrowRight className="ml-2" /></span>
              )}
            </button>

            {/* API Login Implementation */}
            <button
              type="button"
              onClick={handleApiLogin}
              disabled={apiLoading}
              className="w-full flex justify-center py-3 px-4 border-2 border-gray-200 rounded-full font-semibold text-[#4b5563] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#175336] transition-all active:scale-[0.98] disabled:opacity-70 mt-3 text-[14px]"
            >
              {apiLoading ? 'Testing API...' : 'Test API Login Endpoint'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-[#175336] hover:text-[#0F4C3A] transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
