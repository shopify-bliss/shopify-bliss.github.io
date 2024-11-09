import * as yup from "yup";

export const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup.number().required("Phone Number is required"),
  address: yup.string().required("Address is required"),
});
