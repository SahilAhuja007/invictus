import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, AtSign, UserCircle, Upload } from 'lucide-react';
import axios from 'axios';

interface LoginSignupProps {
  onLogin: (userData: any, token: string) => void;
}

const LoginSignup: React.FC<LoginSignupProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    identifier: '',
    isEmail: true
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    imageFile: null as File | null
  });

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const handleIdentifierTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      isEmail: e.target.value === 'email'
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSignupData({
        ...signupData,
        imageFile: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const endpoint = loginData.isEmail ? 'http://localhost:8000/papper/login/email' 
      : 'http://localhost:8000/papper/login/userName';
      const payload = loginData.isEmail 
        ? { email: loginData.identifier } 
        : { userName: loginData.identifier };
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (!data.success) {
        setError(data.message || 'Login failed');
        return;
      } 
      
      // Handle successful login
      onLogin(data.user, data.token);
      setSuccess('Login successful!');
      setTimeout(() => navigate('/'), 1500);
      
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { userName, firstName, lastName, email, imageFile } = signupData;
    
    // Validation
    if (!userName || !firstName || !lastName || !email || !imageFile) {
      setError('All fields are required');
      setLoading(false);
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('userName', userName);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('imageFile', imageFile);
      
      const response = await fetch('http://localhost:8000/papper/signup', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (!data.success) {
        setError(data.message || 'Signup failed');
        return;
      }
      
      setSuccess('Account created successfully! You can now log in.');
      setTimeout(() => {
        setIsLogin(true);
        setSignupData({
          userName: '',
          firstName: '',
          lastName: '',
          email: '',
          imageFile: null
        });
        setPreviewImage(null);
      }, 2000);
      
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleForm}
            className="font-medium text-[#735DA5] hover:text-[#D3C5E5]"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Error and Success Messages */}
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mb-4 bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            </div>
          )}

          {isLogin ? (
            // Login Form
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    Login using
                  </label>
                </div>
                <div className="mt-1 flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="identifierType"
                      value="email"
                      checked={loginData.isEmail}
                      onChange={handleIdentifierTypeChange}
                      className="form-radio h-4 w-4 text-[#735DA5]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="identifierType"
                      value="username"
                      checked={!loginData.isEmail}
                      onChange={handleIdentifierTypeChange}
                      className="form-radio h-4 w-4 text-[#735DA5]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Username</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                  {loginData.isEmail ? 'Email address' : 'Username'}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {loginData.isEmail ? (
                      <Mail className="h-5 w-5 text-gray-400" />
                    ) : (
                      <AtSign className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    id="identifier"
                    name="identifier"
                    type={loginData.isEmail ? 'email' : 'text'}
                    autoComplete={loginData.isEmail ? 'email' : 'username'}
                    required
                    value={loginData.identifier}
                    onChange={handleLoginChange}
                    className="focus:ring-[#735DA5] focus:border-[#735DA5] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                    placeholder={loginData.isEmail ? 'you@example.com' : 'username'}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#735DA5] hover:bg-[#634d8e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#735DA5] ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>
          ) : (
            // Signup Form
            <form className="space-y-6" onSubmit={handleSignup}>
              <div className="flex justify-center">
                <div 
                  className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-4 border-[#D3C5E5]"
                  onClick={triggerFileInput}
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-xs text-gray-500 mt-1">Upload Photo</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/jpg"
                  className="hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={signupData.firstName}
                      onChange={handleSignupChange}
                      className="focus:ring-[#735DA5] focus:border-[#735DA5] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={signupData.lastName}
                      onChange={handleSignupChange}
                      className="focus:ring-[#735DA5] focus:border-[#735DA5] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    autoComplete="username"
                    required
                    value={signupData.userName}
                    onChange={handleSignupChange}
                    className="focus:ring-[#735DA5] focus:border-[#735DA5] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className="focus:ring-[#735DA5] focus:border-[#735DA5] block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#735DA5] hover:bg-[#634d8e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#735DA5] ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;