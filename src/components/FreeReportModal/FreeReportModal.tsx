import { useState } from 'react';
import { Modal, Bar, Button, Header } from '../../components/UI';
import { Form } from '../../components/UI/Form';
import { user as apiUser } from '../../agents';
import { houseHunterValidationSchema, states } from './FreeReportModalTypes';
import { Controller, useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../../utils/commonUtil';
import moment from 'moment';
import { doc, getDoc, updateDoc, collection } from 'firebase/firestore';
import { firestore } from '../../context';

export const FreeReportModal = ({ user, setCreditProfile }) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const resolver = useYupValidationResolver(houseHunterValidationSchema);

  const {
    handleSubmit,
    control,
    register,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      dob: moment().toDate(),
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

  const { ssn, dob } = watch();

  const onSubmit = async (values) => {
    setSaving(true);
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
      const response = await apiUser.submitCreditReport(user.id, requestBodyData);
      // Handle the response as needed
      const score = response?.creditProfile[0]?.riskModel[0]?.score;
      if (score !== undefined) {
        const parsedScore = parseInt(score.toString(), 10);
        setCreditProfile(parsedScore);
        const userDocRef = doc(collection(firestore, 'buyers'), user.id);

        await updateDoc(userDocRef, {
          creditScore: parsedScore,
        });
      }
      setOpen(false);
      reset();
    } catch (error) {
      // Handle the error
      setErrorMessage(
        `${error.message} Contact support contact@friendlyrealtor.app if error persists`,
      );
    } finally {
      setSaving(false);
    }
  };

  const handleRawSSNChange = (newRawSSN) => {
    setValue('ssn', newRawSSN);
  };

  return (
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
          Check Your Credit Health
        </Button>
      }
      onClose={() => setOpen(false)}
      className="bg-white text-black p-4"
      closeXClassName="text-black"
    >
      <Header as="h2" className="mb-4">
        Free Credit Score Check
      </Header>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Text
            label="First Name"
            type="text"
            placeholder="First Name"
            error={errors.firstName}
            className="mb-3 w-full border border-blue-500"
            {...register('firstName', { required: 'First Name is Required.' })}
          />
          <Form.Text
            label="Middle Name"
            type="text"
            placeholder="Middle Name"
            className="mb-3 w-full border border-blue-500"
            {...register('middleName')}
          />
          <Form.Text
            label="Last Name"
            type="text"
            error={errors.lastName}
            placeholder="Last Name"
            className="mb-3 w-full border border-blue-500"
            {...register('lastName', { required: 'Last Name is Required.' })}
          />
        </Form.Row>
        <Form.Row>
          <Controller
            control={control}
            name="dob"
            render={({ field, onChange }) => (
              <div className="text-left">
                <Form.Date
                  label="Date Of Birth"
                  placeholder="Date Of Birth"
                  labelClassName="text-left"
                  error={errors.dob}
                  {...field}
                  selected={dob}
                  required={true}
                  onChange={(date) => setValue('dob', date)}
                />
              </div>
            )}
          />
        </Form.Row>
        <Form.Text
          label="Social Security Number"
          type="text"
          error={errors.ssn}
          placeholder="Social Security Number"
          className="mb-3 w-full border border-blue-500"
          maskSSN
          value={ssn}
          onRawSSNChange={handleRawSSNChange}
          {...register('ssn', {
            required: 'SSN is Required.',
          })}
        />
        <Form.Row>
          <Form.Text
            label="Address"
            type="text"
            placeholder="Address"
            error={errors.address?.line1}
            className="mb-3 w-full border border-blue-500"
            {...register('address.line1', { required: 'Address is Required.' })}
          />
          <Form.Text
            label="Address 2"
            type="text"
            placeholder="Address 2"
            className="mb-3 w-full border border-blue-500"
            {...register('address.line2')}
          />
        </Form.Row>
        <Form.Row>
          <Form.Text
            label="City"
            type="text"
            placeholder="City"
            error={errors.address?.city}
            className="mb-3 w-full border border-blue-500"
            {...register('address.city', { required: 'City is Required.' })}
          />
          <Controller
            control={control}
            name="address.state"
            render={({ field }) => (
              <div className="text-left">
                <Form.Select
                  options={states}
                  label="State"
                  error={errors.address?.state}
                  className="text-left"
                  placeholder="State"
                  required={true}
                  {...field}
                />
              </div>
            )}
          />
          <Form.Text
            label="Zip Code"
            type="text"
            placeholder="Zip Code"
            error={errors.address?.zipCode}
            className="mb-3 w-full border border-blue-500"
            {...register('address.zipCode', { required: 'Zip Code is Required.' })}
          />
        </Form.Row>
        <Form.Row>
          <Button
            type="submit"
            color="secondary"
            className="text-white"
            loading={saving}
            disabled={Object.keys(errors).length > 0}
          >
            Submit
          </Button>
        </Form.Row>
      </Form>
    </Modal>
  );
};
