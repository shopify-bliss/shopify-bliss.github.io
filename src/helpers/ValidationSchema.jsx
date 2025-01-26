import * as yup from "yup";

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

export const recoverySchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export const userSchema = yup.object().shape({
  avatar: yup.string().required("Avatar is required"),
  username: yup.string().required("Username is required"),
  phoneNumber: yup.number().required("Phone number is required"),
});

export const adminSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  username: yup.string().required("Username is required"),
  phoneNumber: yup.number().required("Phone number is required"),
  roleID: yup.string().required("Role is required"),
});

export const resetPasswordSchema = yup.object().shape({
  oldPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("Set password is required")
    .notOneOf(
      [yup.ref("oldPassword")],
      "Set password must not be the same as current password"
    ),
});

export const MenuManSchema = yup.object().shape({
  name: yup.string().required("Menu name is required"),
  url: yup.string().required("Menu url is required"),
  isDevelope: yup.bool().required("Development setting is required"),
});

export const SubmenuManSchema = yup.object().shape({
  name: yup.string().required("Submenu name is required"),
  menuID: yup.string().required("Menu Parent id is required"),
  defaults: yup.bool().required("Default setting is required"),
  isDevelope: yup.bool().required("Development setting is required"),
});

export const AccessManSchema = yup.object().shape({
  menuID: yup.string().required("Menu id is required"),
  roleID: yup.string().required("Role is required"),
});

export const RoleManSchema = yup.object().shape({
  roleName: yup.string().required("Role name is required"),
});

export const updateUserRoleSchema = yup.object().shape({
  userID: yup.string().required("User Id is required"),
  role: yup.string().required("Role is required"),
});

export const tempPagesSchema = yup.object().shape({
  type: yup.string().required("Page name is required"),
  icon: yup.string().required("Page icon is required"),
  name_class: yup.string().required("Page class is required"),
});

export const TempSectionsSchema = yup.object().shape({
  name: yup.string().required("Section name is required"),
});

export const ColorSchema = yup.object().shape({
  color: yup.string().required("Color is required"),
  isDevelope: yup.bool().required("Development setting is required"),
});

export const NameDevelopeSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  isDevelope: yup.bool().required("Development setting is required"),
});

export const FontDesignsSchema = yup.object().shape({
  brand_id: yup.string().required("Brand is required"),
  font1_id: yup.string().required("Font 1 is required"),
  font2_id: yup.string().required("Font 2 is required"),
  group: yup.number().required("Group is required"),
  isDevelope: yup.bool().required("Development setting is required"),
});
