import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import BForm from 'react-bootstrap/Form';
import FormLabel from 'react-bootstrap/FormLabel';
import FormGroup from 'react-bootstrap/FormGroup';

import Check from './Check';
import Control from './Control';
import AsyncButton from './AsyncButton';
import DatePicker from './DatePicker';

const BaseForm = (
  { inline, children, validationSchema, initialValues, onSubmit, ...props },
  ref
) => (
  <Formik
    innerRef={ref}
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    {...props}>
    {(formProps) => (
      <BForm as={FormikForm} inline={inline} noValidate>
        {typeof children === 'function' ? children(formProps) : children}
      </BForm>
    )}
  </Formik>
);

const Form = React.forwardRef(BaseForm);

Form.Row = BForm.Row;
Form.Group = FormGroup;
Form.Label = FormLabel;
Form.Check = Check;
Form.Control = Control;
Form.Date = DatePicker;
Form.Button = AsyncButton;

export default Form;
