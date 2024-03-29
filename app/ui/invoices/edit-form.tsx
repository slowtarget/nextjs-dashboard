'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoice } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { CustomerSelect } from '@/app/ui/invoices/customer-select';
import { InvoiceAmount } from '@/app/ui/invoices/invoice-amount';
import { ErrorLine } from '@/app/ui/invoices/error-line';
import { StatusSelect } from '@/app/ui/invoices/status-select';

export default function EditInvoiceForm({
  invoice,
  customers,
}: Readonly<{
  invoice: InvoiceForm;
  customers: CustomerField[];
}>) {
  const initialState = { message: null, errors: {} };
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  const [state, dispatch] = useFormState(updateInvoiceWithId, initialState);
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <CustomerSelect
          value={invoice?.customer_id}
          customers={customers}
          errors={state.errors?.customerId}
        />

        <InvoiceAmount
          defaultValue={invoice.amount}
          errors={state.errors?.amount}
        />

        <StatusSelect value={invoice.status} errors={state.errors?.status} />

        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && <ErrorLine error={state.message} />}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={'/dashboard/invoices'}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
