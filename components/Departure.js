import DateTimePicker from "./DateTimePicker";

/**
 * A JSX component displaying suggested departure.
 */
export default function Departure({ exitDateTime }) {
  return (
    <>
      <DateTimePicker
        title="Suggested Departure"
        mode="date"
        value={exitDateTime}
        disabled={true}
      />
      <DateTimePicker mode="time" value={exitDateTime} disabled={true} />
    </>
  );
}
