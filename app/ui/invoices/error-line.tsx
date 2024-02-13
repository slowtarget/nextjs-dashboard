export function ErrorLine(props: { error: string }) {
  return <p className="mt-2 text-sm text-red-500">{props.error}</p>;
}
