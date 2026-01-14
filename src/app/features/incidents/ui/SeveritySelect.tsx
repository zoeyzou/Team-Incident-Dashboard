import { Select } from "/ui/index";

interface SeveritySelectProps {
  name?: string;
  value: string;
  onChange: (status: string) => void;
}

export const SeveritySelect: React.FC<SeveritySelectProps> = ({
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
        { value: "Low", label: "Low" },
        { value: "Medium", label: "Medium" },
        { value: "High", label: "High" },
      ]}
      placeholder="Filter by severity"
    />
  );
};

export default SeveritySelect;
