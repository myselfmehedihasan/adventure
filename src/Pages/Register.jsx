import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase.init";
import { GoogleAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";


const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  // ---------------- Email/Password Registration ----------------
  const onSubmit = async (data) => {
    try {
      // Check if email already exists
      const methods = await fetchSignInMethodsForEmail(auth, data.email);
      if (methods.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Email already registered",
          text: "This email is already in use. Please login instead.",
        });
        return; // Stop registration
      }

      // Email not in use → proceed
      const result = await createUser(data.email, data.password);
      if (result.user.uid) {
        Swal.fire({
          icon: "success",
          title: "Registered successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate("/"); // redirect home
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  // ---------------- Google SignIn ----------------
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
 
           // ✅ Redirect after login
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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold max-w-80">
            Adventure awaits — Create your account now!
          </h1>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

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

            <input
              type="url"
              placeholder="Photo URL"
              className="input input-bordered"
              {...register("photoURL")}
            />

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
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

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

            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
            <a href="/login" className="link link-hover mt-2 block">
              Already have an account? Login
            </a>
          </form>

          {/* Google Login */}
          <div className="divider">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline hover:btn-accent"
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
