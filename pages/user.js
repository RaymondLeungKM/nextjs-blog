import { useSelector } from "react-redux";

export default function User() {
  //   UserObject = {
  //     blocked: false,
  //     confirmed: true,
  //     createdAt: "2022-09-17T17:58:29.099Z",
  //     email: "test_user2@test.com",
  //     id: 2,
  //     provider: "local",
  //     updatedAt: "2022-09-17T17:58:29.099Z",
  //     username: "test_user2"
  //   };
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="profile py-4 px-8">
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Member since: {user.createdAt}</p>
    </div>
  );
}
