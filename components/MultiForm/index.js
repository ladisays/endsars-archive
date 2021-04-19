/* eslint-disable consistent-return */
import React, { useState } from 'react';

import Form from 'components/Form';

const Step = ({ children }) => children;

const MultiForm = ({ children, initialValues, wizard = false, onSubmit }) => {
  const [state, setState] = useState(initialValues);
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);

  const step = steps[stepNumber];
  // if (step.type !== Step) {
  //   throw new Error('Only <Step /> components are valid children');
  // }
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;
  const { title, nextLabel, prevLabel } = step.props;

  const next = (values) => {
    setState(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values) => {
    setState(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      try {
        await step.props.onSubmit(values, bag);
        if (isLastStep) {
          return onSubmit(values, bag);
        }
        bag.setTouched({});
        next(values);
      } catch (e) {
        console.log(e);
      }
    } else {
      if (isLastStep) {
        return onSubmit(values, bag);
      }
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Form
      initialValues={state}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}>
      {({ values, isSubmitting }) => (
        <>
          <div className="mt-4">
            {title && <h4>{title}</h4>}
            {wizard && (
              <p>
                Step {stepNumber + 1} of {totalSteps}
              </p>
            )}
          </div>
          {step}
          <div>
            {wizard && stepNumber > 0 && (
              <Form.Button type="button" onClick={() => previous(values)}>
                {prevLabel || 'Back'}
              </Form.Button>
            )}
            <Form.Button block pending={isSubmitting} variant="success">
              {isLastStep ? nextLabel || 'Submit' : nextLabel || 'Next'}
            </Form.Button>
          </div>
        </>
      )}
    </Form>
  );
};

MultiForm.Step = Step;

export default MultiForm;
