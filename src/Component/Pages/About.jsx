const About = () => {
  return (
    <div className="container my-3">
      <h1 className="text-center">About Us</h1>
      <p className="text-center">
        This is a simple note taking app. You can add, edit and delete notes.
      </p>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {/* <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a> */}
              <div className="row">
                <div className="col-md-4">
                  <img className="img-fluid" src="http://localhost:3000/static/media/notes.a2a534d92c3cff97ba49.png" alt="" />
                </div>
                <div className="col-md-8 text-center">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
