const Acknowledgments = () => {
  return (
    <div className="mt-4 text-gray-600 text-sm">
      <h2 className="text-lg font-semibold mb-2">Acknowledgments</h2>
      <p>
        The Chinook database was used as a sample database for this tool. You
        can find the Chinook database and other sample SQLite databases at
        <a
          href="https://database.guide/2-sample-databases-sqlite/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline pl-1"
        >
          database.guide
        </a>
      </p>
      <p>
        Portions of this project's code were adapted from the
        <a
          href="https://github.com/sql-js/react-sqljs-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-900 hover:underline px-1"
        >
          SQL.js React Demo
        </a>
        repository with credit and gratitude.
      </p>
    </div>
  );
};

export default Acknowledgments;
