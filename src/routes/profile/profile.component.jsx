import { useContext, useState } from "react";
import { db, storage } from "../../utils/firebase.utils";
import {
  getBytes,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

import { UserContext } from "../../contexts/user.context";

import FormInput from "../../components/form-input/form-input.component";

import "./profile.styles.scss";

const ProfilePage = () => {
  const { currentUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);

  const getUserData = async () => {
    const userDocRef = doc(db, "users", currentUser.uid);
    const userSnapshot = await getDoc(userDocRef);
    setUserData(userSnapshot.data());
  };

  getUserData();

  const imageChanged = (event) => {
    setImageUpload(event.target.files[0]);
  };

  const handleUpdateProfileImage = () => {
    if (imageUpload == null) return;
    const storageRef = ref(
      storage,
      `users/${userData.vitRegisterNumber}/profileImage`
    );
    uploadBytes(storageRef, imageUpload).then((snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
      const imageListRef = ref(storage, `users/${userData.vitRegisterNumber}`);
      listAll(imageListRef).then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then(async (url) => {
            if (userData.imageUrl) {
              const userDocRef = doc(db, "users", currentUser.uid);
              const userSnapshot = await getDoc(userDocRef);
              const newUserData = { ...userSnapshot.data(), imageUrl: url };
              updateDoc(userDocRef, {
                ...newUserData,
              });
            } else {
              const userDocRef = doc(db, "users", currentUser.uid);
              const userSnapshot = await getDoc(userDocRef);
              const newUserData = { ...userSnapshot.data(), imageUrl: url };
              setDoc(userDocRef, {
                ...newUserData,
              });
            }
          });
        });
      });
    });
  };

  return (
    <div>
      <h1 className="pageHeader">Your Profile</h1>
      {userData && (
        <div>
          <Container className="userDataContainer">
            <Row>
              <Col xs={6} md={5}>
                <Image
                  className="image"
                  src={
                    userData.imageUrl
                      ? userData.imageUrl
                      : "https://images.pexels.com/photos/479454/pexels-photo-479454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  }
                  rounded
                />
              </Col>
              <Col xs={6} md={4}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Change/Upload Profile Photo</Form.Label>
                  <Form.Control type="file" onChange={imageChanged} />
                </Form.Group>
                <FormInput
                  label="Display Name"
                  type="text"
                  disabled
                  name="displayName"
                  value={userData.displayName}
                />
                <FormInput
                  label="Email"
                  type="email"
                  disabled
                  name="email"
                  value={userData.email}
                />
                <FormInput
                  label="VIT Register Number"
                  type="text"
                  disabled
                  name="vitRegisterNumber"
                  value={userData.vitRegisterNumber}
                />
                <FormInput
                  label="Hostel"
                  type="text"
                  disabled
                  name="hostel"
                  value={userData.hostel}
                />
                <FormInput
                  label="Branch"
                  type="text"
                  disabled
                  name="branch"
                  value={userData.branch}
                />
                <FormInput
                  label="Year"
                  type="text"
                  disabled
                  name="year"
                  value={userData.year}
                />
                <FormInput
                  label="Instagram"
                  type="text"
                  disabled
                  name="instagram"
                  value={userData.instagram}
                />
                <Button variant="primary" onClick={handleUpdateProfileImage}>
                  Update Image
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
