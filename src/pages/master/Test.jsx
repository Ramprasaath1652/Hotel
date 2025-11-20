import React, { useState } from "react";

const TestTableDropdown = () => {
    const data = [
        { id: 1, lname: "Zala", fname: "Kajendarsing vhgcjngcvjmvghjjmhvmh", mobile: "9726967351", city: "Chavlaj" },
        { id: 2, lname: "Dabi", fname: "Prabathji", mobile: "9714373185", city: "Chavlaj" },
        { id: 3, lname: "Zala", fname: "Kishorsing", mobile: "9265040632", city: "Chavlaj" },
        { id: 4, lname: "Zala", fname: "Navalsing", mobile: "8200457060", city: "Chavlaj" },
    ];

    const [search, setSearch] = useState("");
    const [showList, setShowList] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    // Filter data based on search input
    const filtered = data.filter((row) =>
        `${row.lname} ${row.fname} ${row.mobile} ${row.city}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // Handle selecting a row (multiple selections)
    const handleSelect = (row) => {
        if (!selectedRows.find(r => r.id === row.id)) {
            setSelectedRows([...selectedRows, row]);
        }
        setSearch("");
        setShowList(false);
    };

    return (
        <div style={{ width: "600px", margin: "30px auto", position: "relative" }}>
            {/* Search box */}
            <input
                type="text"
                placeholder="Search customer..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setShowList(true);
                }}
                onClick={() => setShowList(true)}
                style={{
                    width: "50%",
                    padding: "10px",
                    fontSize: "16px",
                    border: "1px solid gray",
                    borderRadius: "4px"
                }}
            />

          
            {showList && search !== "" && (
                <div
                    style={{
                        position: "absolute",
                        top: "45px",
                        width: "100%",
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        zIndex: 100,
                        maxHeight: "250px",
                        overflowY: "auto",
                    }}
                >
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: "14px",
                        }}
                    >
                        <thead>
                            <tr style={{ background: "#eaeaea", fontWeight: "bold" }}>
                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>CustomerId</th>
                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>SurName</th>
                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>FirstName</th>
                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>Mobile</th>
                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>Aadhar</th>
                                <th style={{ border: "1px solid #ccc", padding: "6px" }}>Area</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map((row) => (
                                    <tr
                                        key={row.id}
                                        onClick={() => handleSelect(row)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <td style={{ border: "1px solid #ccc", padding: "6px" }}>{row.id}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "6px" }}>{row.lname}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "6px" }}>{row.fname}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "6px" }}>{row.mobile}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "6px" }}>—</td>
                                        <td style={{ border: "1px solid #ccc", padding: "6px" }}>{row.city}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        style={{
                                            textAlign: "center",
                                            padding: "10px",
                                            color: "gray",
                                            border: "1px solid #ccc"
                                        }}
                                    >
                                        No results
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}


            {/* Display selected rows */}
            {selectedRows.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                    <h4>Selected Customers:</h4>
                    <table border="1" width="100%">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Mobile</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedRows.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.fname}</td>
                                    <td>{row.lname}</td>
                                    <td>{row.mobile}</td>
                                    <td>{row.city}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TestTableDropdown;
