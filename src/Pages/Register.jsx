// 📂 src/Pages/Register.jsx
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase.init";
import { fetchSignInMethodsForEmail, updateProfile } from "firebase/auth";
import styled from "styled-components";

// ---------------- WaveInput Component ----------------
const WaveInput = ({
  label,
  type = "text",
  name,
  register,
  errors,
  required = true,
  defaultValue,
  validate,
}) => {
  const chars = label.split("");
  return (
    <StyledWrapper className="wave-group">
      <input
        type={type}
        {...register(name, { required, validate })}
        placeholder=" "
        defaultValue={defaultValue}
        className="input"
        required={required}
      />
      <span className="bar" />
      <label className="label">
        {chars.map((char, idx) => (
          <span key={idx} className="label-char" style={{ "--index": idx }}>
            {char}
          </span>
        ))}
      </label>
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">⚠ {errors[name].message}</p>
      )}
    </StyledWrapper>
  );
};

// ---------------- WaveInput Styles ----------------
const StyledWrapper = styled.div`
  position: relative;

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

// ---------------- Register Page ----------------
const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register: hookRegister,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, data.email);
      if (methods.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Email already registered",
          text: "This email is already in use. Please login instead.",
        });
        return;
      }

      const result = await createUser(data.email, data.password);

      if (result.user.uid) {
        // ✅ Update profile with name + photo
        await updateProfile(result.user, {
          displayName: data.name,
          photoURL: data.photoURL,
        });

        Swal.fire({
          icon: "success",
          title: "Registered successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
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
          navigate("/", { replace: true });
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
    <div className="hero bg-transparent min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold max-w-80">
            Adventure awaits — Create your account now!
          </h1>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body space-y-4"
          >
            <WaveInput
              label="Name"
              name="name"
              register={hookRegister}
              errors={errors}
              required={true}
            />

            <WaveInput
              label="Email"
              type="email"
              name="email"
              register={hookRegister}
              errors={errors}
              required={true}
              validate={(value) =>
                /^\S+@\S+$/i.test(value) || "Invalid email address"
              }
            />

            <WaveInput
              label="Photo URL"
              type="url"
              name="photoURL"
              register={hookRegister}
              errors={errors}
            />

            <WaveInput
              label="Password"
              type="password"
              name="password"
              register={hookRegister}
              errors={errors}
              required={true}
              validate={(value) =>
                value.length >= 6 || "Password must be at least 6 characters"
              }
            />

            <WaveInput
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              register={hookRegister}
              errors={errors}
              required={true}
              validate={(value) =>
                value === password || "Passwords do not match"
              }
            />

            <button
              type="submit"
              className="btn btn-neutral mt-4 w-full hover:bg-blue-700"
            >
              Register
            </button>

            <a
              href="/login"
              className="link link-hover mt-2 block text-center"
            >
              Already have an account? Login
            </a>
          </form>

          {/* Google Login */}
          <div className="divider">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline hover:btn-accent w-full flex items-center justify-center gap-2"
            >
              <FcGoogle /> Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
