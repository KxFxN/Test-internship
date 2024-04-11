import { CiSearch } from "react-icons/ci";

type searchType = {
  search: string;
  getUsersByName: any;
  setSearch: any;
};

export default function Search({
  search,
  getUsersByName,
  setSearch,
}: searchType) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <div>
        <input
          type="text"
          placeholder="Type There..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <CiSearch
        size={35}
        color="black"
        style={{ paddingLeft: "1rem", cursor: "pointer" }}
        onClick={() => {
          getUsersByName();
        }}
      />
    </div>
  );
}
