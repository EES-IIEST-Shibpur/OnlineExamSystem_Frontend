import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

function Home() {
  return (
    <main>

      {/* Hero Section */}
      <section className="bg-light py-5 border-bottom">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">
            Welcome to <span className="text-primary">AptiCrack</span>
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "750px" }}>
            AptiCrack is a weekly aptitude assessment initiative by the Electrical Engineers’ Society (EES),
            designed to strengthen logical reasoning, quantitative aptitude, and problem-solving skills
            essential for competitive exams and placements.
          </p>

          <div className="mt-4">
            <button className="btn btn-primary px-4 me-2">
              Participate Now
            </button>
            <button className="btn btn-outline-secondary px-4">
              View Leaderboard
            </button>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-5">
        <div className="container">
          <MDBCarousel showControls showIndicators fade>
            <MDBCarouselItem itemId={1}>
              <img
                src="https://mdbootstrap.com/img/new/slides/041.jpg"
                className="d-block w-100 rounded"
                alt="AptiCrack Assessment"
                style={{ maxHeight: "420px", objectFit: "cover" }}
              />
            </MDBCarouselItem>

            <MDBCarouselItem itemId={2}>
              <img
                src="https://mdbootstrap.com/img/new/slides/042.jpg"
                className="d-block w-100 rounded"
                alt="Problem Solving"
                style={{ maxHeight: "420px", objectFit: "cover" }}
              />
            </MDBCarouselItem>

            <MDBCarouselItem itemId={3}>
              <img
                src="https://mdbootstrap.com/img/new/slides/043.jpg"
                className="d-block w-100 rounded"
                alt="Leaderboard"
                style={{ maxHeight: "420px", objectFit: "cover" }}
              />
            </MDBCarouselItem>
          </MDBCarousel>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-5 border-top border-bottom">
        <div className="container">
          <h2 className="fw-bold mb-3">About AptiCrack</h2>
          <p className="text-muted" style={{ maxWidth: "800px" }}>
            AptiCrack is a structured weekly aptitude test series aimed at preparing students for
            placement tests, competitive examinations, and logical reasoning challenges.
            Each test emphasizes accuracy, time management, and analytical depth.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="fw-bold mb-4 text-center">Why Join AptiCrack?</h2>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Peer Competition</h5>
                  <p className="card-text text-muted">
                    Benchmark your performance against peers and track improvement over time.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Weekly Assessments</h5>
                  <p className="card-text text-muted">
                    Carefully curated problems updated weekly to ensure consistency and rigor.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Leaderboards</h5>
                  <p className="card-text text-muted">
                    Transparent ranking system to recognize top performers.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Skill-Oriented</h5>
                  <p className="card-text text-muted">
                    Focused on logic, mathematics, and analytical reasoning.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;