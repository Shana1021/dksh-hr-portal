import styles from "./table.module.css";

export default function Table({ columns, data, height }) {
  return (
    <div className={styles["table-container"]} style={{height: height}}>
      <table className={styles["table"]}>
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
              row.push(<td key={column.key}>{d[column.key]}</td>);
            }

            return <tr key={d._id}>{row}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};