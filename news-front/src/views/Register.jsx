import { useState, useRef } from "react";
import { useStateContext } from "@/contexts/ContextProvider.jsx";
import axios from "@/axios.js";
import { toast } from "react-toastify";

/** Components */
import Header from "@/components/auth/Header";
import Input from "@/components/auth/Input";

const signupFields = [
  {
    labelText: "Username",
    labelFor: "username",
    id: "username",
    name: "username",
    type: "text",
    autoComplete: "username",
    isRequired: true,
    placeholder: "Username",
  },
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "email-address",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
  },
  {
    labelText: "Confirm Password",
    labelFor: "confirm_password",
    id: "confirm_password",
    name: "confirm_password",
    type: "password",
    autoComplete: "confirm_password",
    isRequired: true,
    placeholder: "Confirm Password",
  },
];

let fieldsState = {};

signupFields.forEach((field) => (fieldsState[field.id] = ""));
export default function Register() {
  /* For inputs*/
  const [signupState, setSignupState] = useState(fieldsState);
  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  /* user State & Errors*/
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser();
  };

  //handle Signup API Integration here
  const registerUser = () => {};

  return (
    <div className="p-2">
      <Header
        heading="Signup to create an account"
        text="Already have an account? "
        linkName="Login"
        linkUrl="/login"
      />
      <form className="mt-8 space-y-6">
        <div className="">
          {signupFields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onSubmit={handleSubmit}
        >
          Sign Up
        </button>
      </form>
    </div>

    // <div>

    //   <div className="alert-danger">
    //     {errors && (
    //       <div className="alert">
    //         {Object.keys(errors).map((key) => (
    //           <p style={{ lineHeight: 0 }} key={key}>
    //             {errors[key][0]}
    //           </p>
    //         ))}
    //       </div>
    //     )}
    //   </div>
  );
}
