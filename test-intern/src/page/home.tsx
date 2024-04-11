import Search from "../components/search";
import Ulist from "../components/ulist";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import "../css/home.css";
import { useEffect, useState } from "react";
import axios from "axios";

type Person = {
  _id: any;
  name: string;
  lastname: string;
  gender: string;
  birthday: Date;
  image: string;
};

export default function Home() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [usersName, setUsersName] = useState<Person[]>([]);
  const [data, setData] = useState<Person[]>([]);
  const [search, setSearch] = useState<any>("");

  const getUsersByName = async () => {
    const [firstName, lastName] = search.split(" ");
    try {
      const response = await axios.get(
        lastName
          ? `http://localhost:3001/api/users/${firstName}%20${lastName}`
          : `http://localhost:3001/api/users/${firstName}`
      );
      setUsersName(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        setData(response.data.data);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div className="users-container">
      <div className="users">
        <h4>Users List</h4>
        <Search
          search={search}
          getUsersByName={getUsersByName}
          setSearch={setSearch}
        />
        <Link to={"/create"} className="add-users">
          Add
          <AiOutlinePlus />
        </Link>
      </div>
      <div>
        {dataLoaded ? (
          <Ulist data={usersName.length > 0 ? usersName : data}/>
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </div>
  );
}
