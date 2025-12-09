export default function FieldRow({ label, value, editable, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-40 text-gray-500">{label}</div>

      {editable ? (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      ) : (
        <div className="font-medium">{value || <i>Not set</i>}</div>
      )}
    </div>
  );
}
