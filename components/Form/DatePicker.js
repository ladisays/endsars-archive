import { Fragment, useState, useEffect } from 'react';
import FormGroup from 'react-bootstrap/FormGroup';
import FormControl from 'react-bootstrap/FormControl';
import FormText from 'react-bootstrap/FormText';
import FormLabel from 'react-bootstrap/FormLabel';
import Col from 'react-bootstrap/Col';
import { useField } from 'formik';
import Datetime from 'react-datetime';
import moment from 'moment';

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
  closeOnClickOutside,
  closeOnTab,
  closeOnSelect,
  input = true,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [{ onChange, ...field }, meta, helpers] = useField(props);
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
    if (typeof props.onChange === 'function') {
      props.onChange(value);
    } else {
      let newValue = value;
      if (moment.isMoment(value)) {
        newValue = input ? value.format(format) : value.toDate();
      }
      helpers.setValue(newValue);
    }
  };

  return (
    <Wrapper {...groupProps}>
      {label && <FormLabel>{label}</FormLabel>}
      {mounted && (
        <Datetime
          utc
          locale="en"
          timeFormat={timeFormat}
          dateFormat={format}
          isValidDate={isValidDate}
          onChange={handleChange}
          renderInput={renderInput}
          inputProps={controlProps}
          value={field.value}
          input={input}
          closeOnSelect={input && closeOnSelect}
          closeOnClickOutside={input && closeOnClickOutside}
          closeOnTab={input && closeOnTab}
          className={!input && isInvalid ? 'is-invalid' : ''}
        />
      )}
      {!input && helpText && <FormText muted>{helpText}</FormText>}
      {!input && isInvalid && (
        <FormControl.Feedback type="invalid">{meta.error}</FormControl.Feedback>
      )}
    </Wrapper>
  );
};

export default DatePicker;
