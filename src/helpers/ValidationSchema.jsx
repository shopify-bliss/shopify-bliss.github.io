import * as yup from "yup";

export const siteTitleSchema = yup.object().shape({
  title: yup
    .string()
    .required("Site Title is required")
    .max(60, "Site Title is too long"),
});

export const signupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  phoneNumber: yup.number().required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(
      /[@$!%*?&#^()_\-+=]/,
      "Password must contain at least one special character."
    ),
});

export const tempPagesSchema = yup.object().shape({
  type: yup.string().required("Page name is required"),
  icon: yup.string().required("Page icon is required"),
  name_class: yup.string().required("Page class is required"),
});

export const TempSectionsSchema = yup.object().shape({
  name: yup.string().required("Section name is required"),
});

export const MenuManSchema = yup.object().shape({
  name: yup.string().required("Menu name is required"),
  url: yup.string().required("Menu url is required"),
});

export const SubmenuManSchema = yup.object().shape({
  name: yup.string().required("Submenu name is required"),
  menuID: yup.string().required("Submenu menu id is required"),
  default: yup.bool().required("Submenu default is required"),
});
