import { useSearchParams } from "react-router-dom";
import { Select } from "./Select";

export const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sortBy") || "";

  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      value={currentSort}
      type='white'
      onChange={handleChange}
    />
  );
};
