import './Viewer.css';

function Viewer({ count }) {
  return (
    <div className="Viewer">
      <div className="viewer_title">현재카운트:</div>
      <div className="viewer_count">{count}</div>
    </div>
  );
}

export default Viewer;
