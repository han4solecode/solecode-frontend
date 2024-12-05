import SortIcon from "../Elements/SortIcon";

function DataTable(props) {
  const { header, body, sortField, sortOrder, handleSort, enableSorting } =
    props;

  return (
    <table className="my-3 shadow-lg rouned table-fixed min-w-full">
      <thead className="bg-gray-800 text-white">
        <tr>
          {header.map((th, key) => {
            if (th !== "Action" && enableSorting === true) {
              return (
                <th
                  className="p-3 text-sm font-semibold tracking-wide"
                  key={key}
                >
                  <div className="flex justify-center items-center gap-1">
                    {th}
                    <button onClick={() => handleSort(th.toLowerCase())}>
                      <SortIcon
                        sortField={sortField}
                        sortOrder={sortOrder}
                        field={th.toLowerCase()}
                      ></SortIcon>
                    </button>
                  </div>
                </th>
              );
            } else {
              return (
                <th
                  className="p-3 text-sm font-semibold tracking-wide"
                  key={key}
                >
                  {th}
                </th>
              );
            }
          })}
        </tr>
      </thead>
      {body}
    </table>
  );
}

export default DataTable;
