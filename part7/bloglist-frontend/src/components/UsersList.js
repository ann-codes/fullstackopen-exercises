import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UsersList = () => {
  const usersList = useSelector((state) => state.usersList);

  const mapUsers = usersList.map((user) => (
    <tr key={user.id}>
      <td><Link to={`/user/${user.id}`}>{user.name}</Link></td>
      <td align="right">{user.blogs.length}</td>
    </tr>
  ));

  return (
    <div>
      <h2>User Stats</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Links Added</th>
          </tr>
        </thead>
        <tbody>{mapUsers}</tbody>
      </table>
    </div>
  );
};

export default UsersList;
