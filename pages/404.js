const NotFound = () => {
  return (
    <div className="d-flex flex-column w-100 justify-content-center align-items-center">
      <p className="d-flex align-items-center text-center">
        <strong className="px-3 mr-md-3">404</strong>
        <small className="text-muted">This page cannot be found.</small>
      </p>
      <p className="mt-3">
        <a className="btn btn-primary" href="/">
          Go Home
        </a>
      </p>
      <style jsx>{`
        div {
          height: 75vh;
        }
        strong {
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
