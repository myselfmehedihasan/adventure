import { useState } from 'react';
import { User, Lock, Mail } from 'lucide-react';

export default function AnimatedLoginForm() {
  const [isActive, setIsActive] = useState(false);

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setIsActive(true);
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    setIsActive(false);
  };

  return (
    <div className="min-h-screen bg-[#38384b] flex items-center justify-center p-4">
      <div className={`relative w-[750px] h-[450px] border-2 border-[#e46033] shadow-[0_0_25px_#e46033] overflow-hidden transition-all duration-1000 ${isActive ? 'active' : ''}`}>
        
        {/* Curved Shape 1 */}
        <div 
          className={`absolute right-0 -top-[5px] h-[600px] w-[850px] bg-gradient-to-br from-[#25252b] to-[#e46033] origin-bottom-right transition-transform duration-[1500ms] ${
            isActive ? 'delay-500 rotate-0 skew-y-0' : 'delay-[1600ms] rotate-[10deg] skew-y-[40deg]'
          }`}
        />
        
        {/* Curved Shape 2 */}
        <div 
          className={`absolute left-[250px] top-full h-[700px] w-[850px] bg-[#25252b] border-t-[3px] border-[#e46033] origin-bottom-left transition-transform duration-[1500ms] ${
            isActive ? 'delay-[1200ms] -rotate-[11deg] -skew-y-[41deg]' : 'delay-500 rotate-0 skew-y-0'
          }`}
        />

        {/* Login Form */}
        <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center px-10 z-10">
          <h2 
            className={`text-[32px] text-center text-white mb-6 transition-all duration-700 ${
              isActive ? 'opacity-0 -translate-x-[120%]' : 'opacity-100 translate-x-0 delay-[2100ms]'
            }`}
          >
            Login
          </h2>
          
          <form>
            <div className={`relative w-full h-[50px] mt-6 transition-all duration-700 ${
              isActive ? 'opacity-0 -translate-x-[120%] delay-100' : 'opacity-100 translate-x-0 delay-[2200ms]'
            }`}>
              <input 
                type="text" 
                required 
                className="w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-colors duration-500 focus:border-[#e46033] peer"
              />
              <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#e46033] peer-valid:-top-[5px] peer-valid:text-[#e46033]">
                Username
              </label>
              <User className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-400 w-5 h-5 peer-focus:text-[#e46033] transition-colors" />
            </div>

            <div className={`relative w-full h-[50px] mt-6 transition-all duration-700 ${
              isActive ? 'opacity-0 -translate-x-[120%] delay-200' : 'opacity-100 translate-x-0 delay-[2300ms]'
            }`}>
              <input 
                type="password" 
                required 
                className="w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-colors duration-500 focus:border-[#e46033] peer"
              />
              <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#e46033] peer-valid:-top-[5px] peer-valid:text-[#e46033]">
                Password
              </label>
              <Lock className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-400 w-5 h-5 peer-focus:text-[#e46033] transition-colors" />
            </div>

            <div className={`relative w-full h-[45px] mt-6 transition-all duration-700 ${
              isActive ? 'opacity-0 -translate-x-[120%] delay-300' : 'opacity-100 translate-x-0 delay-[2400ms]'
            }`}>
              <button 
                type="submit"
                className="relative w-full h-full bg-transparent rounded-[40px] cursor-pointer text-base font-semibold text-white border-2 border-[#e46033] overflow-hidden z-[1] before:content-[''] before:absolute before:h-[300%] before:w-full before:bg-gradient-to-b before:from-[#25252b] before:via-[#e46033] before:to-[#25252b] before:-top-full before:left-0 before:-z-[1] before:transition-all before:duration-500 hover:before:top-0"
              >
                Login
              </button>
            </div>

            <div className={`text-sm text-center mt-5 mb-2 transition-all duration-700 ${
              isActive ? 'opacity-0 -translate-x-[120%] delay-[400ms]' : 'opacity-100 translate-x-0 delay-[2500ms]'
            }`}>
              <p className="text-white">
                Don't have an account? <br />
                <a href="#" onClick={handleSignUpClick} className="text-[#e46033] font-semibold no-underline hover:underline">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Login Info Content */}
        <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center text-right pr-10 pl-[150px] pb-[60px] z-10">
          <h2 className={`uppercase text-4xl leading-tight text-white mb-4 transition-all duration-700 ${
            isActive ? 'opacity-0 translate-x-[120%] blur-[10px]' : 'opacity-100 translate-x-0 blur-0 delay-[2000ms]'
          }`}>
            WELCOME BACK!
          </h2>
          <p className={`text-base text-white transition-all duration-700 ${
            isActive ? 'opacity-0 translate-x-[120%] blur-[10px] delay-100' : 'opacity-100 translate-x-0 blur-0 delay-[2100ms]'
          }`}>
            We are happy to have you with us again. If you need anything, we are here to help.
          </p>
        </div>

        {/* Register Form */}
        <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center px-[60px] z-10">
          <h2 className={`text-[32px] text-center text-white mb-6 transition-all duration-700 ${
            isActive ? 'opacity-100 translate-x-0 blur-0 delay-[1700ms]' : 'opacity-0 translate-x-[120%] blur-[10px]'
          }`}>
            Register
          </h2>
          
          <form>
            <div className={`relative w-full h-[50px] mt-6 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-x-0 blur-0 delay-[1800ms]' : 'opacity-0 translate-x-[120%] blur-[10px] delay-100'
            }`}>
              <input 
                type="text" 
                required 
                className="w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-colors duration-500 focus:border-[#e46033] peer"
              />
              <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#e46033] peer-valid:-top-[5px] peer-valid:text-[#e46033]">
                Username
              </label>
              <User className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors" />
            </div>

            <div className={`relative w-full h-[50px] mt-6 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-x-0 blur-0 delay-[1900ms]' : 'opacity-0 translate-x-[120%] blur-[10px] delay-200'
            }`}>
              <input 
                type="email" 
                required 
                className="w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-colors duration-500 focus:border-[#e46033] peer"
              />
              <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#e46033] peer-valid:-top-[5px] peer-valid:text-[#e46033]">
                Email
              </label>
              <Mail className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors" />
            </div>

            <div className={`relative w-full h-[50px] mt-6 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-x-0 blur-0 delay-[1900ms]' : 'opacity-0 translate-x-[120%] blur-[10px] delay-300'
            }`}>
              <input 
                type="password" 
                required 
                className="w-full h-full bg-transparent border-none outline-none text-base text-white font-semibold border-b-2 border-white pr-6 transition-colors duration-500 focus:border-[#e46033] peer"
              />
              <label className="absolute top-1/2 left-0 -translate-y-1/2 text-base text-white transition-all duration-500 peer-focus:-top-[5px] peer-focus:text-[#e46033] peer-valid:-top-[5px] peer-valid:text-[#e46033]">
                Password
              </label>
              <Lock className="absolute top-1/2 right-0 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors" />
            </div>

            <div className={`relative w-full h-[45px] mt-6 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-x-0 blur-0 delay-[2000ms]' : 'opacity-0 translate-x-[120%] blur-[10px] delay-[400ms]'
            }`}>
              <button 
                type="submit"
                className="relative w-full h-full bg-transparent rounded-[40px] cursor-pointer text-base font-semibold text-white border-2 border-[#e46033] overflow-hidden z-[1] before:content-[''] before:absolute before:h-[300%] before:w-full before:bg-gradient-to-b before:from-[#25252b] before:via-[#e46033] before:to-[#25252b] before:-top-full before:left-0 before:-z-[1] before:transition-all before:duration-500 hover:before:top-0"
              >
                Register
              </button>
            </div>

            <div className={`text-sm text-center mt-5 mb-2 transition-all duration-700 ${
              isActive ? 'opacity-100 translate-x-0 blur-0 delay-[2100ms]' : 'opacity-0 translate-x-[120%] blur-[10px] delay-500'
            }`}>
              <p className="text-white">
                Already have an account? <br />
                <a href="#" onClick={handleSignInClick} className="text-[#e46033] font-semibold no-underline hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Register Info Content */}
        <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center text-left pl-10 pr-[150px] pb-[60px] pointer-events-none z-10">
          <h2 className={`uppercase text-4xl leading-tight text-white mb-4 transition-all duration-700 ${
            isActive ? 'opacity-100 translate-x-0 blur-0 delay-[1700ms]' : 'opacity-0 -translate-x-[120%] blur-[10px]'
          }`}>
            WELCOME!
          </h2>
          <p className={`text-base text-white transition-all duration-700 ${
            isActive ? 'opacity-100 translate-x-0 blur-0 delay-[1800ms]' : 'opacity-0 -translate-x-[120%] blur-[10px] delay-100'
          }`}>
            We're delighted to have you here. If you need any assistance, feel free to reach out.
          </p>
        </div>
      </div>
    </div>
  );
}