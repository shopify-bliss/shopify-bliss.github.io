import { useRef, useState, useEffect, useMemo, Fragment } from "react";
import { ChangeLayout } from "../../AiBuilderSupport";
import sectionsElOptionLayout from "../../../../data/sectionsElOptionLayout.json";
import form from "../../../../data/form.json";
import FormConfig, {
  usernameField,
  emailField,
  phoneField,
  messageField,
} from "./Config/FormConfig";
import { BgColors, OtherColors, SpecialColors } from "../../ColorsSupport";
import { FontType1, FontType2 } from "../../FontsSupport";
import PropTypes from "prop-types";

function Form({
  toastMessage,
  activeForm,
  activeNavbar,
  handleActiveForm,
  activeColors,
  activeFonts,
  firstForm,
  typeMain = null,
}) {
  const [isExpandLayout, setIsExpandLayout] = useState(false);
  const expandLayoutRef = useRef(null);
  const [imageStyle4, setImageStyle4] = useState(null);

  const bg = BgColors({ activeColors });
  const others = OtherColors({ activeColors });
  const special = SpecialColors({ activeColors });
  const type1 = FontType1({ activeFonts });
  const type2 = FontType2({ activeFonts });

  const typeFormStyles = useMemo(
    () => sectionsElOptionLayout.find((option) => option.id === activeForm),
    [activeForm]
  );

  useEffect(() => {
    if (!typeFormStyles) {
      toastMessage("warn", "Form layout not found");
    }
  }, [typeFormStyles, toastMessage]);

  useEffect(() => {
    const getId4 = form.filter((item) => item.id === 4);

    setImageStyle4(getId4.length > 0 ? `/products/${getId4[0].image}` : null);
  }, []);

  return (
    <>
      <div
        className={`form ${typeFormStyles.className} ${
          activeForm === 2 ? others : bg
        } ${firstForm ? "first-form" : ""} ${
          activeNavbar === 2 ? "navbar-2" : activeNavbar === 3 ? "navbar-3" : ""
        }`}
        style={
          typeFormStyles.id === 4
            ? { background: `url(${imageStyle4}) no-repeat center 81% / cover` }
            : {}
        }
      >
        {typeFormStyles.id === 1 && (
          <>
            {form
              .filter((item) => item.id === 1)
              .map((data, index) => {
                return (
                  <Fragment key={index}>
                    <div className="template-wrapper">
                      <div className={`template-title ${type2}`}>
                        {data.title}
                      </div>
                      <div className={`template-desc ${type1}`}>
                        {data.desc}
                      </div>
                    </div>
                    <form className="template-form">
                      {data.username.required === true &&
                        usernameField(
                          true,
                          data.username.placeholder,
                          type1,
                          type2,
                          special
                        )}

                      {data.email.required === true &&
                        emailField(
                          true,
                          data.email.placeholder,
                          type1,
                          type2,
                          special
                        )}

                      {data.phone.required === true &&
                        phoneField(
                          true,
                          data.phone.placeholder,
                          type1,
                          type2,
                          special
                        )}

                      {data.message.required === true &&
                        messageField(
                          true,
                          data.message.placeholder,
                          type1,
                          type2,
                          special
                        )}

                      <button
                        type="submit"
                        className={`template-button ${type1} ${special}`}
                      >
                        {data.button}
                      </button>
                    </form>
                  </Fragment>
                );
              })}
          </>
        )}

        {typeFormStyles.id === 2 && (
          <>
            {form
              .filter((item) => item.id === 2)
              .map((data, index) => {
                return (
                  <Fragment key={index}>
                    <div className="template-wrapper">
                      <div className={`template-title ${type2}`}>
                        {data.title}
                      </div>
                      <div className={`template-desc ${type1}`}>
                        {data.desc}
                      </div>
                    </div>
                    <form className="template-form">
                      {data.username.required === true &&
                        usernameField(
                          true,
                          data.username.placeholder,
                          type1,
                          type2,
                          special
                        )}

                      {data.email.required === true &&
                        emailField(
                          true,
                          data.email.placeholder,
                          type1,
                          type2,
                          special
                        )}

                      {data.phone.required === true &&
                        phoneField(
                          true,
                          data.phone.placeholder,
                          type1,
                          type2,
                          special
                        )}

                      {data.message.required === true &&
                        messageField(
                          true,
                          data.message.placeholder,
                          type1,
                          type2,
                          special
                        )}

                      <button
                        type="submit"
                        className={`template-button ${type1} ${special}`}
                      >
                        {data.button}
                      </button>
                    </form>
                  </Fragment>
                );
              })}
          </>
        )}

        {typeFormStyles.id === 3 && (
          <>
            {form
              .filter((item) => item.id === 3)
              .map((data, index) => {
                const image = `/products/${data.image}`;

                return (
                  <Fragment key={index}>
                    <div className="template-wrapper">
                      <div className={`template-title ${type2}`}>
                        {data.title}
                      </div>
                      <div className={`template-desc ${type1}`}>
                        {data.desc}
                      </div>
                      <form className="template-form">
                        {data.username.required === true &&
                          usernameField(
                            false,
                            data.username.placeholder,
                            type1,
                            type2,
                            special
                          )}

                        {data.email.required === true &&
                          emailField(
                            false,
                            data.email.placeholder,
                            type1,
                            type2,
                            special
                          )}

                        {data.phone.required === true &&
                          phoneField(
                            false,
                            data.phone.placeholder,
                            type1,
                            type2,
                            special
                          )}

                        <button
                          type="submit"
                          className={`template-button ${type1} ${special}`}
                        >
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

        {typeFormStyles.id === 4 && (
          <>
            {form
              .filter((item) => item.id === 4)
              .map((data, index) => {
                return (
                  <Fragment key={index}>
                    <div className="template-wrapper">
                      <div className={`template-title ${type2}`}>
                        {data.title}
                      </div>
                      <div className={`template-desc ${type1}`}>
                        {data.desc}
                      </div>

                      {data.username.required === true &&
                        usernameField(
                          false,
                          data.username.placeholder,
                          type1,
                          type2,
                          special
                        )}

                      {data.email.required === true &&
                        emailField(
                          false,
                          data.email.placeholder,
                          type1,
                          type2,
                          special
                        )}

                      {data.phone.required === true &&
                        phoneField(
                          false,
                          data.phone.placeholder,
                          type1,
                          type2,
                          special
                        )}

                      <button
                        type="submit"
                        className={`template-button ${type1} ${special}`}
                      >
                        {data.button}
                      </button>
                    </div>
                  </Fragment>
                );
              })}
          </>
        )}

        {typeMain === "element" && (
          <ChangeLayout
            expandLayoutRef={expandLayoutRef}
            isExpandLayout={isExpandLayout}
            setIsExpandLayout={setIsExpandLayout}
            onExpand={() => setIsExpandLayout(true)}
            onCollapse={() => setIsExpandLayout(false)}
          />
        )}
      </div>

      {isExpandLayout && (
        <div ref={expandLayoutRef} className="expalot-form">
          <div className="expalot-form-styles">
            <div className="title">Choose a layout option</div>
            <div className="wrapper-left">
              <FormConfig
                layoutIds={[1, 3]}
                activeForm={activeForm}
                handleActiveForm={handleActiveForm}
                imageStyle4={imageStyle4}
                form={form}
                sectionsElOptionLayout={sectionsElOptionLayout}
              />
            </div>
            <div className="wrapper-right">
              <FormConfig
                layoutIds={[2, 4]}
                activeForm={activeForm}
                handleActiveForm={handleActiveForm}
                imageStyle4={imageStyle4}
                form={form}
                sectionsElOptionLayout={sectionsElOptionLayout}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Form.propTypes = {
  toastMessage: PropTypes.func,
  activeForm: PropTypes.number,
  activeNavbar: PropTypes.number,
  handleActiveForm: PropTypes.func,
  activeColors: PropTypes.string,
  activeFonts: PropTypes.string,
  firstForm: PropTypes.bool,
  typeMain: PropTypes.string,
};

export default Form;
