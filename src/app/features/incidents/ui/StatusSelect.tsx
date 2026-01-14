import { Select } from "/ui/index";

interface StatusSelectProps {
  value: string;
  onChange: (status: string) => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ value, onChange }) => {
  return (
    <Select
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
