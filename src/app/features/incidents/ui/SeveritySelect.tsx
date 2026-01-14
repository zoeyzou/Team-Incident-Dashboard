import { Select } from "/ui/index";

interface SeveritySelectProps {
  value: string;
  onChange: (status: string) => void;
}

export const SeveritySelect: React.FC<SeveritySelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <Select
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
