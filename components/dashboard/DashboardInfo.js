import { useAuth } from "../firebase/Auth";

const DashboardInfo = () => {
  const { currentUser } = useAuth();
  return (
    <div>
      <h2>Welcome {currentUser.displayName}</h2>
    </div>
  );
};

export default DashboardInfo;
