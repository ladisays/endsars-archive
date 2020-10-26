import { Fragment } from 'react';
import FormLabel from 'react-bootstrap/FormLabel';
import FormText from 'react-bootstrap/FormText';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import Col from 'react-bootstrap/Col';
import { useField } from 'formik';

const Option = ({ id, value, label, name, disabled = false }) => (
  <option value={value || id} disabled={disabled}>
    {label || name}
  </option>
);

const Control = ({
  as = 'input',
  label,
  type = 'text',
  srOnly = false,
  helpText = '',
  placeholder,
  options = [],
  children,
  grouped = true,
  col = false,
  xs,
  sm,
  md,
  lg,
  xl,
  ...props
}) => {
  const [field, meta] = useField(props);
  const isInvalid = !!(meta.touched && meta.error);
  const controlProps = {
    ...field,
    ...props,
    as,
    isInvalid,
    placeholder: placeholder || label,
    type
  };

  if (['select', 'textarea'].includes(as)) {
    delete controlProps.type;
  }

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

  return (
    <Wrapper {...groupProps}>
      {label && <FormLabel srOnly={srOnly}>{label}</FormLabel>}
      {as === 'select' ? (
        <FormControl custom {...controlProps}>
          <option>{placeholder || 'Please select...'}</option>
          {Array.isArray(options) && options.length
            ? options.map((option) => (
                <Option key={option.id || option.value} {...option} />
              ))
            : children}
        </FormControl>
      ) : (
        <FormControl {...controlProps} />
      )}
      {helpText && <FormText muted>{helpText}</FormText>}
      {isInvalid && (
        <FormControl.Feedback type="invalid">{meta.error}</FormControl.Feedback>
      )}
    </Wrapper>
  );
};

Control.Option = Option;

export default Control;
