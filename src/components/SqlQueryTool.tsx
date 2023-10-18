import { useCallback, useState } from "react";
import { Database, QueryExecResult } from "sql.js";
import ResultsTable from "./ResultsTable";
import Acknowledgments from "./Acknowledgments";

interface SqlQueryToolProps {
  db: Database;
}

function SqlQueryTool(props: SqlQueryToolProps) {
  const { db } = props;
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string>("");
  const [results, setResults] = useState<QueryExecResult[]>([]);

  const executeQuery = useCallback(() => {
    try {
      setResults(db.exec(query));
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(`An error occurred: ${error.message}`);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        setError("An unknown error occurred");
      }
      setResults([]);
    }
  }, [db, query]);

  const copyToTextarea = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setQuery(event.currentTarget.textContent ?? "");
    },
    []
  );

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-semibold mb-4">SQL Query Tool</h1>
      <div className="mb-2">
        <p className="text-gray-600 text-sm mb-1">
          Example queries you can try:
        </p>
        <div
          className="cursor-pointer text-gray-600 text-sm hover:bg-gray-100 px-2 py-1 rounded transition duration-300 ease-in-out mt-1"
          onClick={(e) => copyToTextarea(e)}
        >
          PRAGMA table_list;
        </div>
        <div
          className="cursor-pointer text-gray-600 text-sm hover:bg-gray-100 px-2 py-1 rounded transition duration-300 ease-in-out mt-1"
          onClick={(e) => copyToTextarea(e)}
        >
          SELECT * FROM Artist LIMIT 10;
        </div>
      </div>
      <div className="w-full mb-4">
        <textarea
          name="sqlQuery"
          className="w-full h-20 p-2 border rounded"
          placeholder="Enter your SQL query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={executeQuery}
      >
        Execute Query
      </button>
      {error.length > 0 && <div className=" text-red-600">{error}</div>}
      <div className="mt-4">
        {results.map(({ columns, values }, i) => (
          <ResultsTable key={i} columns={columns} values={values} />
        ))}
      </div>
      <Acknowledgments />
    </div>
  );
}

export default SqlQueryTool;
