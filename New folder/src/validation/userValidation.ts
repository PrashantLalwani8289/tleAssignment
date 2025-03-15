import * as yup from "yup";

export const signUpSchema = () =>
  yup.object().shape({
    full_name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
    confirm_password: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

export const signInSchema = () =>
  yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
  });


 