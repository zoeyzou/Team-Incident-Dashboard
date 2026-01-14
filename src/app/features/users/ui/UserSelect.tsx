import { useGetUsersQuery } from "../api";
import { Select } from "/ui/index";

interface UserSelectProps {
  name?: string;
  value: string;
  onChange: (id: string) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({ name, value, onChange }) => {
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
      name={name}
      value={value}
      onChange={onChange}
      options={options}
      placeholder="Choose a user"
    />
  );
};

export default UserSelect;
