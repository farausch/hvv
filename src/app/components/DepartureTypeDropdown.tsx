import { PAYLOAD_CONFIGS, PayloadTypeKeys } from '../lib/types';

interface DepartureTypeDropdownProps {
  value: PayloadTypeKeys;
  onChange: (value: PayloadTypeKeys) => void;
}

export default function DepartureTypeDropdown({ value, onChange }: DepartureTypeDropdownProps) {
  const payloadOptions = Object.values(PAYLOAD_CONFIGS);

  return (
    <div className="w-full">
      <select
        id="departure-type"
        value={value}
        onChange={(e) => onChange(e.target.value as PayloadTypeKeys)}
        className="block w-full rounded-md bg-transparent px-4 py-2 text-sm shadow-sm focus:outline-none"
      >
        {payloadOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.displayName}
          </option>
        ))}
      </select>
    </div>
  );
}
