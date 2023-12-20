import React from "react";
import { useForm, Controller } from "react-hook-form";

export const PaymentMethod = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    // Handle form submission, e.g., send data to your server
    console.log(data);
  };

  return (
    <div className="max-w-md p-6 bg-white shadow-md mt-10 rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Payment Method</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Card Number</label>
          <Controller
            name="cardNumber"
            control={control}
            defaultValue=""
            rules={{ required: "Card number is required" }}
            render={({ field }) => <input {...field} type="text" className="mt-1 p-2 w-full border rounded-md" />}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Expiration</label>
          <Controller
            name="expiration"
            control={control}
            defaultValue=""
            rules={{ required: "Expiration date is required" }}
            render={({ field }) => <input {...field} type="text" className="mt-1 p-2 w-full border rounded-md" />}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">CVC</label>
          <Controller
            name="cvc"
            control={control}
            defaultValue=""
            rules={{ required: "CVC is required" }}
            render={({ field }) => <input {...field} type="text" className="mt-1 p-2 w-full border rounded-md" />}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Country</label>
          <Controller
            name="country"
            control={control}
            defaultValue=""
            rules={{ required: "Country is required" }}
            render={({ field }) => <input {...field} type="text" className="mt-1 p-2 w-full border rounded-md" />}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Zip Code</label>
          <Controller
            name="zipCode"
            control={control}
            defaultValue=""
            rules={{ required: "Zip code is required" }}
            render={({ field }) => <input {...field} type="text" className="mt-1 p-2 w-full border rounded-md" />}
          />
        </div>
        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Payment Method</button>
        </div>
      </form>
    </div>
  );
};
