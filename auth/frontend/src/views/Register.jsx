import { useState } from "react";
import { useStateContext } from "@/contexts/ContextProvider.jsx";
import { useNavigate } from "react-router-dom";
import axios from "@/axios.js";
import { toast } from "react-toastify";
import { useFocus } from "@/components/helper/Focus";

/** Components */
import Header from "@/components/auth/Header";
import Input from "@/components/auth/Input";
import Loader from "@/components/helper/Loader";

const signupFields = [
  {
    labelText: "name",
    labelFor: "name",
    id: "name",
    name: "name",
    type: "text",
    autoComplete: "name",
    isRequired: true,
    placeholder: "Username",
  },
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
  {
    labelText: "Confirm Password",
    labelFor: "password_confirmation",
    id: "password_confirmation",
    name: "password_confirmation",
    type: "password",
    autoComplete: "password_confirmation",
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
  const { setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [focus, setFocus] = useFocus();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  //handle Signup API Integration here
  const registerUser = () => {
    setErrors(null);
    setSubmittingForm(true);
    axios
      .post("/auth/register", signupState)
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
          error.response.data && error.response.data.data
            ? error.response.data.data.message
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
        heading="Signup to create an account"
        text="Already have an account? "
        linkName="Login"
        linkUrl="/login"
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
          disabled={submittingForm}
          className="group relative w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 disabled:bg-purple-400 disabled:opacity-50 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
          onSubmit={handleSubmit}
        >
          <Loader show={submittingForm} />
          Sign Up
        </button>
      </form>
    </div>
  );
}
