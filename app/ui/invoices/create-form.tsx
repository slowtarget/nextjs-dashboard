'use client';
import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { ErrorLine } from '@/app/ui/invoices/error-line';
import { CustomerSelect } from '@/app/ui/invoices/customer-select';
import { InvoiceAmount } from '@/app/ui/invoices/invoice-amount';
import { StatusSelect } from '@/app/ui/invoices/status-select';

export default function Form({
  customers,
}: Readonly<{ customers: CustomerField[] }>) {
  const initialState = { message: null, errors: {} };
  const useFormStateResponse: [
    state: State,
    dispatch: (payload: FormData) => void,
  ] = useFormState(createInvoice, initialState);
  const [state, dispatch] = useFormStateResponse;

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
        <StatusSelect errors={state.errors?.status} />

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
