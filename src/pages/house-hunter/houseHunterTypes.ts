import * as Yup from 'yup';

export const houseHunterValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  ssn: Yup.string().required('Social Security Number is required'),
  dob: Yup.date().required('Date of Birth is required'),
  address: Yup.string().required('Address is required'),
});
export const testRequestBody = {
  consumerPii: {
    primaryApplicant: {
      name: {
        lastName: 'CANN',
        firstName: 'JOHN',
        middleName: 'N',
      },
      dob: {
        dob: '1955',
      },
      ssn: {
        ssn: '111111111',
      },
      currentAddress: {
        line1: '510 MONDRE ST',
        city: 'MICHIGAN CITY',
        state: 'IN',
        zipCode: '46360',
      },
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
    riskModels: {
      modelIndicator: [''],
      scorePercentile: '',
    },
  },
  customOptions: {
    optionId: ['COADEX'],
  },
};
