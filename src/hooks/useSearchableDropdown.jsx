import { useState, useCallback } from "react";

const useSearchableDropdown = (data = []) => {
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // Filter logic
  const filtered = data.filter((row) =>
    `${row.lname} ${row.fname} ${row.mobile} ${row.city}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Select row
  const handleSelect = useCallback(
    (row) => {
      if (!selectedRows.find((r) => r.id === row.id)) {
        setSelectedRows((prev) => [...prev, row]);
      }
      setSearch("");
      setShowList(false);
    },
    [selectedRows]
  );

  // When typing in input
  const onSearchChange = (value) => {
    setSearch(value);
    setShowList(true);
  };

  return {
    search,
    setSearch,
    showList,
    setShowList,
    selectedRows,
    filtered,
    onSearchChange,
    handleSelect,
  };
};

export default useSearchableDropdown;
