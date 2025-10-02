import React, { useEffect, useState } from "react";
import { DataTable, Card } from "@shopify/polaris";

function Submissions() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sqlite-app-test-g0r1.onrender.com/users")
      .then((resp) => resp.json())
      .then((data) => {
        console.log("API response:", data);

        let users = [];
        if (data.users) {
          users = data.users; // case: { users: [...] }
        } else if (Array.isArray(data)) {
          users = data; // case: [...] directly
        }

        if (users.length > 0) {
          const cols = Object.keys(users[0]);
          setColumns(cols);

          // Convert objects → array of values for DataTable
          const tableRows = users.map((user) => cols.map((col) => user[col]));
          setRows(tableRows);
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (rows.length === 0) return <p>No records found.</p>;

  return (
        <Card>
            <DataTable
                columnContentTypes={columns.map(() => "text")} // all columns text
                headings={columns}
                rows={rows}
            />
        </Card>
  );
}

export default Submissions;
