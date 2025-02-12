import React, { useState } from 'react';
import { PhoneIcon } from 'lucide-react';
import LoginWithOtp from '../pages/LoginWithOtp';

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPage, setShowPage] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedNumber = phoneNumber.replace(/\D/g, '');
    if (sanitizedNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    
    console.log('Sending verification for +91' + sanitizedNumber);
    setShowPage(true)
  };

  if(showPage){
    return <LoginWithOtp phoneNumber={phoneNumber}/>
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md my-5">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center">
        <PhoneIcon className="mr-2" />
        Login with Phone
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="bg-white border rounded-md w-16 h-12 flex items-center justify-center">
            <span className="text-gray-600 font-medium">+91</span>
          </div>
          <input 
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            inputMode="numeric" 
            pattern="[0-9]*"
            maxLength="10"
            placeholder="Enter 10-digit mobile number" 
            className="flex-1 px-4 h-12 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full h-12 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default PhoneLogin;