import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://facebook.com/ees.iiests.shibpur' className='me-4 text-reset' target='_blank' rel='noopener noreferrer'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='https://www.instagram.com/ees_iiests/' className='me-4 text-reset' target='_blank' rel='noopener noreferrer'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='https://linkedin.com/company/ees_iiests' className='me-4 text-reset' target='_blank' rel='noopener noreferrer'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='https://github.com/EES-IIEST-Shibpur' className='me-4 text-reset' target='_blank' rel='noopener noreferrer'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="bolt" className="me-3" />
                Electrical Engineers' Society
              </h6>
              <p>
                The Electrical Engineers’ Society (EES) of IIEST Shibpur is a student-run body committed to technical excellence, innovation, and professional development, bridging academic learning with real-world engineering practice.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4 border-start border-light ps-4">
              <h6 className="text-uppercase fw-bold mb-4">Our Initiatives</h6>

              <p>
                <a
                  href="https://sphuran.eesiiests.org"
                  className="text-reset"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sphuran - Tech Fest
                </a>
              </p>

              <p>
                <a
                  href="https://apticrack.eesiiests.org"
                  className="text-reset"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AptiCrack - Weekly Aptitude Test
                </a>
              </p>

              <p>
                <a
                  href="https://workshops.eesiiests.org"
                  className="text-reset"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Workshops & Symposiums
                </a>
              </p>
            </MDBCol>


            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-4 border-start border-light ps-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Electrical Engineering Department, IIEST Shibpur, Howrah - 711103, India
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                secretary@eesiiests.org
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> +91 9064767147
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear()} Copyright:
        <a className='text-reset fw-bold' href='https://www.eesiiests.org/' target='_blank' rel='noopener noreferrer'>
          Electrical Engineers' Society, IIEST Shibpur
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;