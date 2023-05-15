import { useState, useRef } from "react";
import { useStateContext } from "@/contexts/ContextProvider.jsx";
import axios from "@/axios.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFocus } from "@/components/helper/Focus";

/** Components */
import Header from "@/components/auth/Header";
import Input from "@/components/auth/Input";

const loginFields = [
  {
    labelText: "Email address",
    labelFor: "email",
    id: "email",
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
];

let fieldState = {};
export default function Login() {
  /* For inputs*/
  loginFields.forEach((field) => (fieldState[field.id] = ""));
  const [loginState, setLoginState] = useState(fieldState);
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  /* user State & Errors*/
  const { setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [focus, setFocus] = useFocus();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  //Handle Login API Integration here
  const loginUser = () => {
    setErrors(null);
    setSubmittingForm(true);
    axios
      .post("/auth/login", loginState)
      .then((response) => {
        const { token } = response.data.data;

        setToken(token);
        navigate("/home");
      })
      .catch((error) => {
        if (error.response.status == 422) {
          setErrors(error.response.data.data);
          setFocus();
        }
        toast.error(
          error.response.data
            ? error.response.data.message
            : "Something went wrong,please try again later!"
        );
      })
      .finally(() => {
        setSubmittingForm(false);
      });
  };

  return (
    <div className="p-2">
      <Header
        heading="Login to your account"
        text="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/register"
      />
      <div className="">
        {errors && (
          <div className="bg-red-200 p-2" ref={focus}>
            {Object.keys(errors).map((key) => (
              <p className="text-red-500 mb-1" key={key}>
                {errors[key][0]}
              </p>
            ))}
          </div>
        )}
      </div>
      <form className="mt-8 space-y-6" method="post" onSubmit={handleSubmit}>
        <div className="">
          {loginFields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
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
        >
          {submittingForm ? (
            <svg
              className="w-5 h-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M3.055 13H5.07a7.002 7.002 0 0 0 13.858 0h2.016a9.001 9.001 0 0 1-17.89 0zm0-2a9.001 9.001 0 0 1 17.89 0H18.93a7.002 7.002 0 0 0-13.858 0H3.055z"></path>
              </g>
            </svg>
          ) : (
            ""
          )}
          Login
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
