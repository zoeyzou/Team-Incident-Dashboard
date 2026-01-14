import { Select } from "/ui/index";

interface StatusSelectProps {
  name?: string;
  value: string;
  onChange: (status: string) => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({
  name,
  value,
  onChange,
}) => {
  return (
    <Select
      name={name}
      value={value}
      onChange={onChange}
      options={[
        { value: "Open", label: "Open" },
        { value: "In Progress", label: "In Progress" },
        { value: "Resolved", label: "Resolved" },
      ]}
      placeholder="Filter by status"
    />
  );
};

export default StatusSelect;
