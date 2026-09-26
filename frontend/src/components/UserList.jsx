import UserListItem from "./UserListItem";
import "./UserList.css";

function UserList({ users, onDeleteUser }) {
  return (
    <ul className="MovieList">
      {users.map((user, index) => (
        <UserListItem
          key={index}
          user={user}
          onDeleteUser={() => onDeleteUser(user)}
        />
      ))}
    </ul>
  );
}

export default UserList;
