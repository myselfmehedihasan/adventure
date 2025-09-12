import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";
import { signInWithPopup } from "firebase/auth";

const Register = () => {
  const { createUser,googleSignIn } = useContext(AuthContext);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // function when form is valid
  const onSubmit = (data) => {
    // console.log("Form Submitted:", data);
    createUser(data.email, data.password)
      .then((result) => {
        if (result.user.uid) {
          Swal.fire({
            icon: "success",
            title: "You have successfully registered!",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      })
      .catch((error) => {
        // 🔹 Check if email already in use
        if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "This email is already registered! Please use a different email.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      });
  };

  // watch password for confirm password check
  const password = watch("password");

  // google login 
  const handleGoogleLogin = () =>{
    googleSignIn()
  }

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold max-w-80">Adventure awaits — Create your account now.!</h1>
            
          </div>

          {/* Card */}
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              {/* 🔹 Name */}
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              {/* 🔹 Email */}
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              {/* Photo URl */}
              <input
                type="url"
                className="input input-bordered"
                placeholder="Photo URL"
                {...register}
              />

              {/* 🔹 Password */}
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              {/* 🔹 Confirm Password */}
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-neutral mt-4">
                Register
              </button>
              <a href="/login">
                Already have an account?{" "}
                <span className="link link-hover">Login</span>
              </a>
            </form>

            
              <div className="divider">
                <button onClick={handleGoogleLogin} className="btn btn-outline hover:btn-accent ">
                 <FcGoogle /> Continue with Google 
                </button>
                
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
