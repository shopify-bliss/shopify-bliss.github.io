import * as yup from "yup";

export const siteTitleSchema = yup.object().shape({
  title: yup.string().required("Site Title is required").max(60, "Site Title is too long"),
});
