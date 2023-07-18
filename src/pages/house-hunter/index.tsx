import { useState } from 'react';
import { useAuthContext } from '../../context';
import { Modal, Button, Header } from '../../components/UI';
import { useFormik } from 'formik';
import axios from 'axios';
import { auth } from '../../agents';

const HouseHunter = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
			try {
				const data = {
					// Add your data properties here
					// For example:
					userId: user.id,
					reportType: 'credit',
				};
	
				const response = await auth.submitCreditReport(data);
				// Handle the response as needed
				console.log(response.data);
			} catch (error) {
				// Handle the error
				console.error(error);
			}
		},
  });

  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);

  if (!user) {
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <div>
      <div>Welcome {user.name}</div>
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
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default HouseHunter;
