import { Fragment } from 'react';
import FormCheck from 'react-bootstrap/FormCheck';
import FormText from 'react-bootstrap/FormText';
import FormGroup from 'react-bootstrap/FormGroup';
import { useField } from 'formik';

const Check = ({
  label,
  type = 'checkbox',
  helpText,
  disabled,
  grouped = false,
  ...props
}) => {
  const [field, meta] = useField({
    ...props,
    type
  });
  const isInvalid = !!(meta.touched && meta.error);
  const checkProps = {
    ...field,
    ...props,
    type
  };
  const Wrapper = grouped ? FormGroup : Fragment;

  if (type === 'switch') {
    return (
      <Wrapper>
        <FormCheck
          disabled={disabled}
          label={label}
          {...checkProps}
          type={type}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FormCheck
        custom
        isInvalid={isInvalid}
        feedback={meta.error}
        disabled={disabled}>
        <FormCheck.Input
          id={checkProps.name}
          isInvalid={isInvalid}
          {...checkProps}
        />
        <FormCheck.Label htmlFor={checkProps.name}>{label}</FormCheck.Label>
        {helpText && <FormText>{helpText}</FormText>}
      </FormCheck>
    </Wrapper>
  );
};

export default Check;
