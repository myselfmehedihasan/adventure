// 📂 src/Pages/Login.jsx
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";

// ---------------- Wave Input Component ----------------
const WaveInput = ({ type, label, ...rest }) => {
  return (
    <WaveInputWrapper className="wave-group">
      <input {...rest} type={type} required className="input peer" />
      <span className="bar"></span>
      <label className="label">
        {label.split("").map((char, idx) => (
          <span key={idx} className="label-char" style={{ "--index": idx }}>
            {char}
          </span>
        ))}
      </label>
    </WaveInputWrapper>
  );
};

const WaveInputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  .input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #515151;
    background: transparent;
  }

  .input:focus {
    outline: none;
  }

  .label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    display: flex;
  }

  .label-char {
    transition: 0.2s ease all;
    transition-delay: calc(var(--index) * 0.05s);
  }

  .input:focus ~ .label .label-char,
  .input:valid ~ .label .label-char {
    transform: translateY(-20px);
    font-size: 14px;
    color: #5264ae;
  }

  .bar {
    position: relative;
    display: block;
    width: 100%;
  }

  .bar:before,
  .bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #5264ae;
    transition: 0.2s ease all;
  }

  .bar:before {
    left: 50%;
  }

  .bar:after {
    right: 50%;
  }

  .input:focus ~ .bar:before,
  .input:focus ~ .bar:after {
    width: 50%;
  }
`;

// ---------------- Login Component ----------------
const Login = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        if (result.user.uid) {
          Swal.fire({
            icon: "success",
            title: "You have successfully logged in!",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        if (result.user.uid) {
          Swal.fire({
            icon: "success",
            title: "You have successfully logged in!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  return (
    <div className="max-w-3xl bg-amber-50 mx-auto flex-col justify-center items-center mt-20">
      <h1 className="text-center text-4xl mb-6">
        Log in and continue your adventure!
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-sm mx-auto p-6 shadow-md rounded"
      >
        {/* Email */}
        <WaveInput
          type="email"
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password */}
        <WaveInput
          type="password"
          label="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <input
          type="submit"
          value="Login"
          className="w-full btn btn-neutral mt-4 text-white py-2 rounded hover:bg-blue-700"
        />

        <a href="/register" className="block text-center mt-2">
          Don't have an account?{" "}
          <span className="link link-hover">Register Here!!</span>
        </a>
      </form>

      <div className="divider">OR</div>

      <div className="text-center">
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline hover:bg-black/50 flex items-center gap-2 mx-auto"
        >
          <FcGoogle /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
