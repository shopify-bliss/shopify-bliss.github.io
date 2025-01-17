/* eslint-disable react-refresh/only-export-components */

import { Fragment } from "react";
import PropTypes from "prop-types";

export const usernameField = (label, placeholder, type1, type2, special) => {
  const borderedSpecial = special?.replace(/^color-special-/, "");

  return (
    <div className="template-form-group">
      {label && (
        <label className={`${type2}`} htmlFor="username">
          Username <span>(required)</span>
        </label>
      )}
      <input
        type="text"
        id="username"
        name="username"
        autoComplete="username"
        placeholder={placeholder}
        className={`${type1}`}
        style={{ "--border-special-color": `#${borderedSpecial}` }}
      />
    </div>
  );
};

usernameField.propTypes = {
  label: PropTypes.bool,
  placeholder: PropTypes.string,
  type1: PropTypes.string,
  type2: PropTypes.string,
  special: PropTypes.string,
};

export const emailField = (label, placeholder, type1, type2, special) => {
  const borderedSpecial = special?.replace(/^color-special-/, "");

  return (
    <div className="template-form-group">
      {label && (
        <label className={`${type2}`} htmlFor="email">
          Email <span>(required)</span>
        </label>
      )}
      <input
        type="text"
        id="email"
        name="email"
        autoComplete="email"
        placeholder={placeholder}
        className={`${type1}`}
        style={{ "--border-special-color": `#${borderedSpecial}` }}
      />
    </div>
  );
};

emailField.propTypes = {
  label: PropTypes.bool,
  placeholder: PropTypes.string,
  type1: PropTypes.string,
  type2: PropTypes.string,
  special: PropTypes.string,
};

export const phoneField = (label, placeholder, type1, type2, special) => {
  const borderedSpecial = special?.replace(/^color-special-/, "");

  return (
    <div className="template-form-group">
      {label && (
        <label className={`${type2}`} htmlFor="phone">
          Phone Number <span>(required)</span>
        </label>
      )}
      <input
        type="number"
        id="phone"
        name="phone"
        autoComplete="tel"
        placeholder={placeholder}
        className={`${type1}`}
        style={{ "--border-special-color": `#${borderedSpecial}` }}
      />
    </div>
  );
};

phoneField.propTypes = {
  label: PropTypes.bool,
  placeholder: PropTypes.string,
  type1: PropTypes.string,
  type2: PropTypes.string,
  special: PropTypes.string,
};

export const messageField = (label, placeholder, type1, type2, special) => {
  const borderedSpecial = special?.replace(/^color-special-/, "");

  return (
    <div className="template-form-group">
      {label && (
        <label className={`${type2}`} htmlFor="message">
          Message <span>(required)</span>
        </label>
      )}
      <textarea
        name="message"
        id="message"
        placeholder={placeholder}
        className={`${type1}`}
        style={{ "--border-special-color": `#${borderedSpecial}` }}
      ></textarea>
    </div>
  );
};

messageField.propTypes = {
  label: PropTypes.bool,
  placeholder: PropTypes.string,
  type1: PropTypes.string,
  type2: PropTypes.string,
  special: PropTypes.string,
};

function FormConfig({
  layoutIds,
  activeForm,
  handleActiveForm,
  imageStyle4,
  form,
  sectionsElOptionLayout,
}) {
  return (
    <>
      {sectionsElOptionLayout
        .filter((item) => layoutIds.includes(item.id))
        .map((layout) => {
          return (
            <div
              key={layout.id}
              className={`${layout.layoutClassName} ${
                activeForm === layout.id ? "active" : ""
              }`}
              onClick={() => handleActiveForm(layout.id)}
              style={
                layout.id === 4
                  ? {
                      background: `url(${imageStyle4}) no-repeat center 81% / cover`,
                    }
                  : {}
              }
            >
              {layout.id === 1 && (
                <>
                  {form
                    .filter((item) => item.id === 1)
                    .map((data, index) => {
                      return (
                        <Fragment key={index}>
                          <div className="template-wrapper">
                            <div className="template-title">{data.title}</div>
                            <div className="template-desc">{data.desc}</div>
                          </div>
                          <form className="template-form">
                            {data.username.required === true &&
                              usernameField(true, data.username.placeholder)}

                            {data.email.required === true &&
                              emailField(true, data.email.placeholder)}

                            {data.phone.required === true &&
                              phoneField(true, data.phone.placeholder)}

                            {data.message.required === true &&
                              messageField(true, data.message.placeholder)}

                            <button type="submit" className="template-button">
                              {data.button}
                            </button>
                          </form>
                        </Fragment>
                      );
                    })}
                </>
              )}

              {layout.id === 2 && (
                <>
                  {form
                    .filter((item) => item.id === 2)
                    .map((data, index) => {
                      return (
                        <Fragment key={index}>
                          <div className="template-wrapper">
                            <div className="template-title">{data.title}</div>
                            <div className="template-desc">{data.desc}</div>
                          </div>
                          <form className="template-form">
                            {data.username.required === true &&
                              usernameField(true, data.username.placeholder)}

                            {data.email.required === true &&
                              emailField(true, data.email.placeholder)}

                            {data.phone.required === true &&
                              phoneField(true, data.phone.placeholder)}

                            {data.message.required === true &&
                              messageField(true, data.message.placeholder)}

                            <button type="submit" className="template-button">
                              {data.button}
                            </button>
                          </form>
                        </Fragment>
                      );
                    })}
                </>
              )}

              {layout.id === 3 && (
                <>
                  {form
                    .filter((item) => item.id === 3)
                    .map((data, index) => {
                      const image = `products/${data.image}`;

                      return (
                        <Fragment key={index}>
                          <div className="template-wrapper">
                            <div className="template-title">{data.title}</div>
                            <div className="template-desc">{data.desc}</div>
                            <form className="template-form">
                              {data.username.required === true &&
                                usernameField(false, data.username.placeholder)}

                              {data.email.required === true &&
                                emailField(false, data.email.placeholder)}

                              {data.phone.required === true &&
                                phoneField(false, data.phone.placeholder)}

                              <button type="submit" className="template-button">
                                {data.button}
                              </button>
                            </form>
                          </div>
                          <img
                            className="template-image"
                            src={image}
                            alt="form image"
                          />
                        </Fragment>
                      );
                    })}
                </>
              )}

              {layout.id === 4 && (
                <>
                  {form
                    .filter((item) => item.id === 4)
                    .map((data, index) => {
                      return (
                        <Fragment key={index}>
                          <div className="template-wrapper">
                            <div className="template-title">{data.title}</div>
                            <div className="template-desc">{data.desc}</div>

                            {data.username.required === true &&
                              usernameField(false, data.username.placeholder)}

                            {data.email.required === true &&
                              emailField(false, data.email.placeholder)}

                            {data.phone.required === true &&
                              phoneField(false, data.phone.placeholder)}

                            <button type="submit" className="template-button">
                              {data.button}
                            </button>
                          </div>
                        </Fragment>
                      );
                    })}
                </>
              )}
            </div>
          );
        })}
    </>
  );
}

FormConfig.propTypes = {
  layoutIds: PropTypes.array,
  activeForm: PropTypes.number,
  handleActiveForm: PropTypes.func,
  imageStyle4: PropTypes.string,
  form: PropTypes.array,
  sectionsElOptionLayout: PropTypes.array,
};

export default FormConfig;
