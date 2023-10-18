import { QueryExecResult } from "sql.js";

const ResultsTable = (props: QueryExecResult) => {
  const { columns, values } = props;

  return (
    <table className="table-auto">
      <thead>
        <tr>
          {columns.map((columnName, i) => (
            <th className="px-4 py-2" key={i}>
              {columnName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map((row, i) => (
          <tr key={i}>
            {row.map((value, i) => (
              <td className="border px-4 py-2" key={i}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;
