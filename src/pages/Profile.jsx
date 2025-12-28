import React, { useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const PROFILE_FIELDS = [
  { label: "Email", key: "email", fallback: "Not Available" },
  { label: "Phone", key: "phone", fallback: "Not Provided" },
  { label: "Department", key: "department", fallback: "N/A" },
  { label: "Enrollment No", key: "enrollmentNumber", fallback: "N/A" },
  { label: "Semester", key: "semester", fallback: "N/A" },
  { label: "Year", key: "year", fallback: "N/A" },
];

const ProfilePage = React.memo(() => {
  const { user } = useContext(AuthContext);

  const profileData = useMemo(() => {
    return PROFILE_FIELDS.map(({ label, key, fallback }) => ({
      label,
      value: user?.[key] ?? fallback,
    }));
  }, [user]);

  if (!user) {
    return (
      <MDBContainer className="py-5 text-center">
        <MDBTypography tag="h5">Loading profile...</MDBTypography>
      </MDBContainer>
    );
  }

  return (
    <MDBContainer className="py-5 d-flex justify-content-center">
      <MDBCard className="shadow-3 w-100" style={{ maxWidth: "720px" }}>
        <MDBRow className="g-0">
          {/* Profile Image */}
          <MDBCol
            md="4"
            className="d-flex align-items-center justify-content-center bg-light py-4 rounded-start"
          >
            <MDBCardImage
              src={
                user.avatar ||
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
              }
              alt={`${user.name}'s profile avatar`}
              className="rounded-circle"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          </MDBCol>

          {/* Profile Details */}
          <MDBCol md="8">
            <MDBCardBody>
              <MDBTypography
                tag="h4"
                className="mb-4 text-center text-md-start"
              >
                {user.name || "Unknown User"}
              </MDBTypography>

              {profileData.map(({ label, value }) => (
                <div
                  key={label}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <strong>{label}:</strong>
                  <span className="text-muted">{value}</span>
                </div>
              ))}
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
});

export default ProfilePage;