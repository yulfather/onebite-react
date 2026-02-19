import { useParams } from 'react-router-dom';

function Edit() {
  const params = useParams();

  return <div>{params.id}번째 Edit</div>;
}

export default Edit;
