import { useEffect, useState } from "react";
import initSqlJs, { Database } from "sql.js";
import SqlQueryTool from "./SqlQueryTool";
import sqliteUrl from "../assets/sql-wasm.wasm?url";
import LoadingIndicator from "./LoadingIndicator";
import ErrorDisplay from "./ErrorDisplay";

const DbConnection = () => {
  const [db, setDb] = useState<Database | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function initializeDatabase() {
      try {
        const SQL = await initSqlJs({ locateFile: () => sqliteUrl });
        const response = await fetch("Chinook.db");
        const buffer = await response.arrayBuffer();
        const data = new Uint8Array(buffer);
        const db = new SQL.Database(data);
        setDb(db);
      } catch (error) {
        if (error instanceof Error) {
          setError(`An error occurred: ${error.message}`);
        } else if (typeof error === "string") {
          setError(error);
        } else {
          setError("An unknown error occurred " + error);
        }
      }
    }

    initializeDatabase();
  }, []);

  if (error.length > 0) return <ErrorDisplay error={error} />;
  else if (!db) return <LoadingIndicator />;
  else return <SqlQueryTool db={db} />;
};

export default DbConnection;
