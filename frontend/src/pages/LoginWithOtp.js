import React, { useState, useRef, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

const LoginWithOtp = ({phoneNumber}) => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [count, setCount] = useState(30)
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, otp.length);
  }, [otp]);

  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    const timer = count > 0 && setTimeout(() => setCount(count-1), 1000)
    return () => clearTimeout(timer)
  },[count])

  const handleResendOtp = () => {
    setCount(30);
    console.log('Resending OTP to ' + phoneNumber);
  };
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('OTP Submitted:', otp.join(''));
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Enter Correct Otp</h2>
      <p className="text-center text-gray-600 mb-6">
        Enter the 6-digit code sent to +91 {phoneNumber}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="number"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              placeholder={Array(1).fill(0)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              required
            />
          ))}
        </div>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {count > 0 ? `Resend OTP in ${count}s` : 'OTP Expired'}
          </p>
          <button 
            type="button"
            onClick={handleResendOtp}
            disabled={count > 0}
            className="flex items-center text-blue-500 hover:text-blue-600 disabled:text-gray-400"
          >
            <RefreshCcw className="mr-2" size={16} />
            Resend
          </button>
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          disabled={otp.some(digit => !digit)}
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default LoginWithOtp;
