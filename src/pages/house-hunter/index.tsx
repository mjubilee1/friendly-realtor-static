import { useAuthContext } from '../../context';

const HouseHunter = () => {
  const { user } = useAuthContext();

  console.log('here', user);
  if (!user) {
    return <div>You must be logged in to view this page.</div>;
  }
  return <div>Enter</div>;
};

export default HouseHunter;
