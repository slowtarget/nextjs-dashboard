import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

export function InvoiceAmount(props: { defaultValue: number }) {
  return (
    <div className="mb-4">
      <label htmlFor="amount" className="mb-2 block text-sm font-medium">
        Choose an amount
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            defaultValue={props.defaultValue}
            placeholder="Enter USD amount"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
    </div>
  );
}
