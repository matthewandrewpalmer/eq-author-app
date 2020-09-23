import React from "react";
import PropTypes from "prop-types";
import { flowRight, find } from "lodash";

import { Grid, Column } from "components/Grid";
import { ValidationPills } from "../ValidationPills";
import ValidationTitle from "../ValidationTitle";
import AlignedColumn from "../AlignedColumn";
import Duration from "../Duration";
import { ERR_NO_VALUE } from "constants/validationMessages";
import withChangeUpdate from "enhancers/withChangeUpdate";
import * as entityTypes from "constants/validation-entity-types";
import { DATE  } from "constants/answer-types";
import { DAYS, MONTHS, YEARS } from "constants/durations";
import PathEnd from "../path-end.svg?inline";

import { StyledError, RelativePositionText, ConnectedPath, Now } from "./components";
import PreviousAnswerEditor from "./PreviousAnswerEditor";
import MetadataEditor from "./MetadataEditor";
import CustomEditor from "./CustomEditor";
import PositionPicker from "./PositionPicker.js";

const START_COL_SIZE = 3;
const END_COL_SIZE = 12 - START_COL_SIZE;
const UNITS = [DAYS, MONTHS, YEARS];

const getUnits = format => {
  switch(format) {
    case "dd/mm/yyyy":
      return UNITS;
    case "mm/yyyy":
      return UNITS.slice(1);
    default:
      return UNITS.slice(2);
  }
}

const UnwrappedDateValidation = ({validation, answer, displayName, onChange, onUpdate, onChangeUpdate, readKey}) => {
  const { offset, relativePosition, entityType } = validation;
  const { type, properties: { format } } = answer;
  const availableUnits = getUnits(format ? format : "dd/mm/yyyy");

  const hasError = find(validation.validationErrorInfo.errors, error =>
    error.errorCode.includes("ERR_NO_VALUE")
  );

  return (
    <div>
      <Grid>
        <AlignedColumn cols={START_COL_SIZE}>
          <ValidationTitle>{displayName} is</ValidationTitle>
        </AlignedColumn>
        <Column cols={END_COL_SIZE}>
          <Duration
            name="offset"
            duration={offset}
            value={offset.unit}
            units={availableUnits}
            onChange={onChange}
            onUpdate={onUpdate}
            hasError={hasError}
          />
        </Column>
      </Grid>
      <Grid>
        <Column cols={START_COL_SIZE}>
          <ConnectedPath />
        </Column>
        <Column cols={END_COL_SIZE}>
          {hasError && <StyledError>{ERR_NO_VALUE}</StyledError>}
        </Column>
      </Grid>
      <Grid>
        <AlignedColumn cols={START_COL_SIZE}>
          { type === DATE
            ? <PositionPicker value={relativePosition} onChange={onChange} onUpdate={onUpdate} />
            : <RelativePositionText> { relativePosition.toLowerCase() } </RelativePositionText>
          }
          <PathEnd />
        </AlignedColumn>
        <Column cols={9}>
          <ValidationPills
            entityType={entityType}
            onEntityTypeChange={onChangeUpdate}
            Metadata={MetadataEditor}
            answer={answer}
            validation={validation}
            readKey={readKey}
            onChange={onChange}
            onUpdate={onUpdate}
            onChangeUpdate={onChangeUpdate}
            Custom={CustomEditor}
            {...(type === DATE ? 
              {
                PreviousAnswer: PreviousAnswerEditor,
                Now: Now
              } : {})}
          />
        </Column>
      </Grid>
    </div>
  );
}

UnwrappedDateValidation.propTypes = {
  validation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    customDate: PropTypes.string,
    previousAnswer: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
    }),
    metadata: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
    }),
    offset: PropTypes.shape({
      unit: PropTypes.string.isRequired,
      value: PropTypes.number,
    }).isRequired,
    relativePosition: PropTypes.string.isRequired,
    entityType: PropTypes.oneOf(Object.values(entityTypes)).isRequired,
  }).isRequired,
  answer: PropTypes.shape({
    id: PropTypes.string.required,
    properties: PropTypes.shape({
      format: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onToggleValidationRule: PropTypes.func.isRequired,
  onChangeUpdate: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  displayName: PropTypes.string.isRequired,
  readKey: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default flowRight(withChangeUpdate)(UnwrappedDateValidation);
export { UnwrappedDateValidation };
