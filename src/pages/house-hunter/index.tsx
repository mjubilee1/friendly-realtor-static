import { useState } from 'react';
import { useAuthContext } from '../../context';
import { Modal, Bar, Button, Header } from '../../components/UI';
import { Form } from '../../components/UI/Form';
import { useFormik } from 'formik';
import axios from 'axios';
import { user as apiUser } from '../../agents';
import { houseHunterValidationSchema, testRequestBody, states } from './houseHunterTypes';

const HouseHunter = () => {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [creditProfile, setCreditProfile] = useState([]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      dob: '',
      ssn: '',
      address: '',
    },
    validationSchema: houseHunterValidationSchema,
    onSubmit: async (values) => {
      console.log('values', values);
      try {
        const response = await apiUser.submitCreditReport(user.id, testRequestBody);
        // Handle the response as needed
        setCreditProfile(response?.creditProfile[0]);
      } catch (error) {
        // Handle the error
        console.error(error);
      } finally {
        setOpen(false);
      }
    },
  });

  if (!user) {
    return <div>You must be logged in to view this page.</div>;
  }

  const score = !!creditProfile?.riskModel?.length ? creditProfile.riskModel[0].score : undefined;
  const formattedScore = Number(score).toString();

  return (
    <div>
      <div className="mb-6">Welcome {`${user.firstName} ${user.lastName}`}</div>
      {formattedScore !== 'NaN' && <Bar number={Number(formattedScore)} />}
      <div className="mt-8" />
      {formattedScore !== 'NaN' && <p>{`You score is ${formattedScore}`}</p>}
      <div className="mt-16" />
      <Modal
        open={open}
        id="get-credit-modal"
        trigger={
          <Button
            type="button"
            color="secondary"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-sm"
          >
            Get Free Credit Report
          </Button>
        }
        onClose={() => setOpen(false)}
        className="bg-white text-black p-4"
        closeXClassName="text-black"
      >
        <Header as="h2" className="mb-4">
          Get Free Credit Report
        </Header>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Row>
            <Form.Text
              label="First Name"
              type="text"
              placeholder="First Name"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
            />
            <Form.Text
              label="Middle Name"
              type="text"
              placeholder="Middle Name"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
            />
            <Form.Text
              label="Last Name"
              type="text"
              placeholder="Last Name"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
            />
          </Form.Row>
          <Form.Row>
            <Form.Date label="DOB" placeholder="Date Of Birth" />
          </Form.Row>
          <Form.Text
            label="Social Security Number"
            type="text"
            placeholder="Social Security Number"
            className="mb-3 px-4 pt-2 w-full border border-blue-500"
          />
          <Form.Row>
            <Form.Text
              label="Address"
              type="text"
              placeholder="Address"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
            />
            <Form.Text
              label="City"
              type="text"
              placeholder="City"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
            />
          </Form.Row>
          <Form.Row>
            <Form.Select label="State" placeholder="State" options={states} />
            <Form.Text
              label="Zip Code"
              type="text"
              placeholder="Zip Code"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
            />
          </Form.Row>
          <Form.Row>
            <Button
              type="submit"
              color="secondary"
              disabled={Object.keys(formik.errors).length > 0}
            >
              Submit
            </Button>
          </Form.Row>
        </Form>
      </Modal>
    </div>
  );
};

export default HouseHunter;
