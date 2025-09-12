import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProviders";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser,googleSignIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    signInUser(data.email, data.password)
      .then((result) => {
        if (result.user.uid) {
          Swal.fire({
            icon: "success",
            title: "You have successfully Login!",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      })
      .catch((error) => {
        {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        }
      });
  };


  // google login 
  const handleGoogleLogin = () =>{
    googleSignIn()
  }
  return (
    <div className="  max-w-3xl mx-auto flex-col justify-center items-center mt-20">
        <h1 className="text-center text-4xl">Log in and continue your adventure!</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-sm mx-auto p-6 shadow-md rounded"
      >
        {/* 🔹 Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* 🔹 Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
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

        <a href="/register">
                Don't have Account?{" "}
                <span className="link link-hover">Register Here!!</span>
              </a>
        </form>

        <div className="divider">
                        <button onClick={handleGoogleLogin} className="btn btn-outline hover:btn-accent ">
                         <FcGoogle /> Continue with Google 
                        </button>
                    </div>
      
      
    </div>
  );
};

export default Login;
