import "./table.css";

export default function Table({ columns, data, height }) {
  return (
    <div className="table-container" style={{height: height}}>
      <table className="table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(d => {
            let row = [];
            for (const column of columns) {
              row.push(<td>{d[column.key]}</td>);
            }

            return <tr key={d._id}>{row}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};