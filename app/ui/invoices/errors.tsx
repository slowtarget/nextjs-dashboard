import { ErrorLine } from '@/app/ui/invoices/error-line';

export function Errors(props: { errors?: string[]; id: string }) {
  return (
    <div id={props.id} aria-live="polite" aria-atomic="true">
      {props.errors?.map((error: string) => (
        <ErrorLine key={error} error={error} />
      ))}
    </div>
  );
}
