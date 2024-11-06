function DataTable(props) {
  const { header, body } = props;

  return (
    <table className="w-full my-3 shadow-lg rouned">
      <thead className="bg-gray-800 text-white">
        <tr>
          {header.map((th, key) => (
            <th className="p-3 text-sm font-semibold tracking-wide" key={key}>
              {th}
            </th>
          ))}
        </tr>
      </thead>
      {body}
    </table>
  );
}

export default DataTable;
