import React from "react";
import ValidationContext from "App/questionPage/Design/Validation/ValidationContext";

export default validationName => Component => props => (
  <ValidationContext.Consumer>
    {({ answer }) => {
      let propsWithValidation = {
        [validationName]: answer.validation[validationName],
        answer,
        ...props,
      };
      return <Component {...propsWithValidation} />;
    }}
  </ValidationContext.Consumer>
);
