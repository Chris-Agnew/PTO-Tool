import { useAuth } from "../firebase/Auth";

const DashboardInfo = () => {
  const { currentUser }: any = useAuth();
  console.log(currentUser);

  return (
    <div className="my-24">
      <h2 className="text-4xl">Welcome {currentUser.displayName}</h2>
    </div>
  );
};

export default DashboardInfo;
