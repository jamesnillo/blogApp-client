import { Link } from 'react-router-dom';

export default function Banner({ data }) {
  const { title, content, destination, buttonLabel } = data;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1>{title}</h1>
      <p className="mb-4">{content}</p>
      <Link to={destination} className="btn btn-primary">
        {buttonLabel}
      </Link>
    </div>
  );
}
