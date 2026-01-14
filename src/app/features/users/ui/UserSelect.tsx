import { useGetUsersQuery } from "../api";
import { Select } from "/ui/index";

interface UserSelectProps {
  value: string;
  onChange: (id: string) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({ value, onChange }) => {
  const { data: users = [], error } = useGetUsersQuery();

  if (error) {
    return <div className="text-red-500">Error loading users</div>;
  }

  const options = users.map((user) => ({
    value: user.id,
    label: user.name,
  }));

  return (
    <Select
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Choose a user"
    />
  );
};

export default UserSelect;
