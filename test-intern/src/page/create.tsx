import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../css/create.css";
import axios from "axios";

export default function Create() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [image, setImage] = useState<any>(null);

  const handleDateDay = (date: string) => {
    setBirthday(date);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      reader.onload = () => {
        const base64 = reader.result;
        setImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setName("");
    setLastname("");
    setGender("");
    setBirthday("");
    setImage(null);
  };

  const addUsers = () => {
    axios
      .post("http://localhost:3001/api/users", {
        name: name,
        lastname: lastname,
        gender: gender,
        birthday: birthday,
        image: image,
      })
      .then(() => {
        console.log("User added successfully!");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  const upDateUser = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/api/users/${id}`, {
        name,
        lastname,
        gender,
        birthday,
        image,
      });

      if (res.status !== 500) {
        navigate(`/create/${id}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/users?id=${id}`);
        const data = res.data.data;
        setName(data.name);
        setLastname(data.lastname);
        setGender(data.gender);
        setBirthday(data.birthday);
        setImage(data.image);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="create-container">
      <div className="create">
        <h4>Create new User</h4>
        <Link to={"/"} className="add-users">
          Users List
        </Link>
      </div>
      <form
        action=""
        className="from-container"
        id="add"
        onSubmit={id ? upDateUser : addUsers}
      >
        <div className="updata">
          <div className="pic-container">
            <img src={image ? image : ""} alt="" className="profile" />
            <div className="button-pic">
              <label htmlFor="upload" id="upload-pic">
                Upload Profile Picture
                <input
                  type="file"
                  id="upload"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  key={image ? image : "no-image"}
                />
              </label>
              <div
                id="delete-pic"
                onClick={() => {
                  setImage(null);
                }}
              >
                Delete Picture
              </div>
            </div>
          </div>
          <div className="input-data">
            <div>
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                id="firstName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Please enter First name"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Please enter Last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" hidden>
                  -- Please select Gender --
                </option>
                <option value="male">ชาย</option>
                <option value="female">หญิง</option>
              </select>
            </div>
            <div>
              <label htmlFor="birthday">Birthday</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={birthday?.toString().slice(0, 10) || ""}
                onChange={(e) => handleDateDay(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="upload-button">
          <button id="cancel" form="1" onClick={resetForm}>
            CANCEL
          </button>
          <button id="save" type="submit" form="add">
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
}
