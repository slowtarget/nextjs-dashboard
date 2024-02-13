'use client';
import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useEffect } from 'react';
import { ErrorLine } from '@/app/ui/invoices/error-line';
import { Errors } from '@/app/ui/invoices/errors';
import { CustomerSelect } from '@/app/ui/invoices/customer-select';
import { InvoiceAmount } from '@/app/ui/invoices/invoice-amount';

export default function Form({
  customers,
}: Readonly<{ customers: CustomerField[] }>) {
  const initialState = { message: null, errors: {} };
  const useFormStateResponse: [
    state: State,
    dispatch: (payload: FormData) => void,
  ] = useFormState(createInvoice, initialState);
  const [state, dispatch] = useFormStateResponse;

  const options = [
    { value: 'pending', label: 'Pending', icon: ClockIcon },
    { value: 'paid', label: 'Paid', icon: CheckIcon },
  ];

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}

        <CustomerSelect
          value={''}
          customers={customers}
          errors={state.errors?.customerId}
        />

        {/* Invoice Amount */}
        <InvoiceAmount errors={state.errors?.amount} />

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              {/* Radio buttons */}
              {options.map((option) => {
                const Icon = option.icon;
                return (
                  <div className="flex items-center" key={option.value}>
                    <input
                      id={option.value}
                      name="status"
                      type="radio"
                      value={option.value}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                      aria-describedby="status-error"
                    />
                    <label
                      htmlFor={option.value}
                      className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      {option.label} <Icon className="h-4 w-4" />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <Errors id={'status-error'} errors={state.errors?.status} />
        </fieldset>
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && <ErrorLine error={state.message} />}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
