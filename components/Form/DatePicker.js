import { Fragment } from 'react';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import FormText from 'react-bootstrap/FormText';
import FormLabel from 'react-bootstrap/FormLabel';
import Col from 'react-bootstrap/Col';
import { useField } from 'formik';
import Datetime from 'react-datetime';

import useMounted from 'hooks/useMounted';

const renderInput = ({ error, className, helpText, ...props }) => {
  return (
    <>
      <FormControl {...props} />
      {helpText && <FormText muted>{helpText}</FormText>}
      {props.isInvalid && (
        <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
      )}
    </>
  );
};

const DatePicker = ({
  label,
  placeholder,
  helpText = '',
  timeFormat = false,
  format = 'DD.MM.YYYY',
  grouped = true,
  col = false,
  xs,
  sm,
  md,
  lg,
  xl,
  isValidDate = undefined,
  ...props
}) => {
  const isMounted = useMounted();
  const [field, meta, helpers] = useField(props);
  const isInvalid = !!(meta.touched && meta.error);
  const controlProps = {
    ...field,
    ...props,
    isInvalid,
    placeholder: placeholder || label,
    error: meta.error,
    helpText
  };
  const Wrapper = grouped ? FormGroup : Fragment;
  const groupProps = grouped
    ? {
        controlId: props.name,
        as: (col && Col) || undefined,
        xs,
        sm,
        md,
        lg,
        xl
      }
    : undefined;
  const handleChange = (value) => {
    let newValue = value;
    if (newValue.constructor.name === 'Moment') {
      newValue = value.format(format);
    }
    helpers.setValue(newValue);
  };

  return (
    <Wrapper {...groupProps}>
      {label && <FormLabel>{label}</FormLabel>}
      {isMounted && (
        <Datetime
          locale="de"
          timeFormat={timeFormat}
          dateFormat={format}
          renderInput={renderInput}
          inputProps={controlProps}
          onChange={handleChange}
          value={field.value}
          isValidDate={isValidDate}
          closeOnSelect
        />
      )}
    </Wrapper>
  );
};

export default DatePicker;
