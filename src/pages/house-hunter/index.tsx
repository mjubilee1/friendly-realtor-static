import { useState } from 'react';
import { useAuthContext } from '../../context';
import { Modal, Bar, Button, Header } from '../../components/UI';
import { useFormik } from 'formik';
import axios from 'axios';
import { user as apiUser } from '../../agents';
import { houseHunterValidationSchema, testRequestBody } from './houseHunterTypes';
import { Form } from 'formik';
const HouseHunter = () => {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [creditProfile, setCreditProfile] = useState([]);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    //validationSchema: houseHunterValidationSchema,
    onSubmit: async (values) => {
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
        <Header as="h2">Get Free Credit Report</Header>
        <form onSubmit={formik.handleSubmit}>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default HouseHunter;
