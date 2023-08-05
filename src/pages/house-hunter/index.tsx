import { useState } from 'react';
import { useAuthContext } from '../../context';
import { Modal, Bar, Button, Header } from '../../components/UI';
import { Form } from '../../components/UI/Form';
import axios from 'axios';
import { user as apiUser } from '../../agents';
import { houseHunterValidationSchema, testRequestBody, states } from './houseHunterTypes';
import { Controller, useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../../utils/commonUtil';

const HouseHunter = () => {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [creditProfile, setCreditProfile] = useState([]);
  const resolver = useYupValidationResolver(houseHunterValidationSchema);

  const {
    handleSubmit,
    control,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      dob: '',
      ssn: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zipCode: '',
      },
    },
    //resolver: resolver,
  });

  if (!user) {
    return <div>You must be logged in to view this page.</div>;
  }

  const score = !!creditProfile?.riskModel?.length ? creditProfile.riskModel[0].score : undefined;
  const formattedScore = Number(score).toString();

  const onSubmit = async (values) => {
    const requestBodyData = {
      consumerPii: {
        primaryApplicant: {
          name: {
            lastName: values.lastName,
            firstName: values.firstName,
            middleName: values.middleName,
          },
          dob: values.dob.getFullYear(),
          ssn: {
            ssn: values.ssn,
          },
          currentAddress: {
            line1: values.address.line1,
            line2: values.address.line2,
            city: values.address.city,
            state: values.address.state?.value,
            zipCode: values.address.zipCode,
          },
        },
        requestor: {
          subscriberCode: '2222222',
        },
        permissiblePurpose: {
          type: '08',
        },
        resellerInfo: {
          endUserName: 'CPAPIV2TC21',
        },
        vendorData: {
          vendorNumber: '072',
          vendorVersion: 'V1.29',
        },
        addOns: {
          directCheck: '',
          demographics: 'Only Phone',
          clarityEarlyRiskScore: 'Y',
          liftPremium: 'Y',
          clarityData: {
            clarityAccountId: '0000000',
            clarityLocationId: '000000',
            clarityControlFileName: 'test_file',
            clarityControlFileVersion: '0000000',
          },
          renterRiskScore: 'N',
          rentBureauData: {
            primaryApplRentBureauFreezePin: '1234',
            secondaryApplRentBureauFreezePin: '112233',
          },
          riskModels: {
            modelIndicator: [''],
            scorePercentile: '',
          },
          summaries: {
            summaryType: [''],
          },
          fraudShield: 'Y',
          mla: '',
          ofacmsg: '',
          consumerIdentCheck: {
            getUniqueConsumerIdentifier: '',
          },
          joint: '',
          paymentHistory84: '',
          syntheticId: 'N',
          taxRefundLoan: 'Y',
          sureProfile: 'Y',
          incomeAndEmploymentReport: 'Y',
          incomeAndEmploymentReportData: {
            verifierName: 'Experian',
            reportType: 'ExpVerify-Plus',
          },
        },
        customOptions: {
          optionId: ['COADEX'],
        },
      },
    };
    try {
      console.log(requestBodyData);
      //const response = await apiUser.submitCreditReport(user.id, requestBodyData);
      // Handle the response as needed
      //setCreditProfile(response?.creditProfile[0]);
    } catch (error) {
      // Handle the error
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <Form.Text
              label="First Name"
              type="text"
              placeholder="First Name"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
              {...register('firstName')}
            />
            <Form.Text
              label="Middle Name"
              type="text"
              placeholder="Middle Name"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
              {...register('middleName')}
            />
            <Form.Text
              label="Last Name"
              type="text"
              placeholder="Last Name"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
              {...register('lastName')}
            />
          </Form.Row>
          <Form.Row>
            <Controller
              control={control}
              name="dob"
              render={({ field }) => (
                <Form.Date
                  label="Date Of Birth"
                  placeholder="Date Of Birth"
                  labelClassName="text-left"
                  {...field}
                />
              )}
            />
          </Form.Row>
          <Form.Text
            label="Social Security Number"
            type="text"
            placeholder="Social Security Number"
            className="mb-3 px-4 pt-2 w-full border border-blue-500"
            {...register('ssn')}
          />
          <Form.Row>
            <Form.Text
              label="Address"
              type="text"
              placeholder="Address"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
              {...register('address.line1')}
            />
            <Form.Text
              label="Address 2"
              type="text"
              placeholder="Address 2"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
              {...register('address.line2')}
            />
          </Form.Row>
          <Form.Row>
            <Form.Text
              label="City"
              type="text"
              placeholder="City"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
              {...register('address.city')}
            />
            <Controller
              control={control}
              name="address.state"
              render={({ field }) => (
                <Form.Select
                  options={states}
                  label="State"
                  labelClassName="text-left"
                  placeholder="State"
                  {...field}
                />
              )}
            />
            <Form.Text
              label="Zip Code"
              type="text"
              placeholder="Zip Code"
              className="mb-3 px-4 pt-2 w-full border border-blue-500"
              {...register('address.zipCode')}
            />
          </Form.Row>
          <Form.Row>
            <Button type="submit" color="secondary">
              Submit
            </Button>
          </Form.Row>
        </Form>
      </Modal>
    </div>
  );
};

export default HouseHunter;
