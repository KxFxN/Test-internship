import React, { useState } from "react";
import Pagination from "./pagination";
import "../css/ulist.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Person = {
  _id: any;
  name: string;
  lastname: string;
  gender: string;
  birthday: Date;
  image: string;
};

type UlistProps = {
  data: Person[];
};

const formatBirthday = (birthday: Date) => {
  const date = new Date(birthday);
  return `${date.getDate()} ${date.toLocaleString("en-US", {
    month: "long",
  })} ${date.getFullYear()}`;
};

export default function Ulist({ data }: UlistProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * 3;
  const indexOfFirstItem = indexOfLastItem - 3;

  const deleteUser = async (id: any) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="list-container">
      <table className="table">
        <thead>
          <tr>
            <th>Profile picture</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice(indexOfFirstItem, indexOfLastItem)
            // .filter((item) => {
            //   const searchTerm = search.toLowerCase();
            //   return (
            //     searchTerm === "" ||
            //     normalizeAndIncludes(item.name, searchTerm) ||
            //     normalizeAndIncludes(item.lastname, searchTerm) ||
            //     normalizeAndIncludes(item.gender, searchTerm)
            //   );
            // })
            .map((user, index) => (
              <React.Fragment key={index}>
                <tr>
                  {user.image ? (
                    <td>
                      <div className="avatar-img">
                        <img
                          src={user.image}
                          alt=""
                          className="avatar-img-list"
                        />
                      </div>
                    </td>
                  ) : (
                    <td>
                      <div className="avatar-text">
                        <span className="avatar-text-list">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </td>
                  )}
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.gender}</td>
                  {/* <td>{user.birthday}</td> */}
                  <td>{formatBirthday(user.birthday)}</td>
                  <td className="button-user">
                    <button
                      id="edit"
                      onClick={() => {
                        navigate(`/create/${user._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      id="delete-user"
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
      <div className="page">
        <Pagination
          data={data}
          dataPerPage={3}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

// function normalizeAndIncludes(term: string, searchTerm: string) {
//   return term.toLowerCase().includes(searchTerm);
// }
