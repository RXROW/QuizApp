 
import { useAuth } from '../../context/UserContext';

const Profile = () => {
  const { user } = useAuth();   

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>

      {user ? (
        <div>
          <div className="mb-4">
            <strong className="block">Name:</strong>
            <p>{user.name}</p>
          </div>

          <div className="mb-4">
            <strong className="block">Email:</strong>
            <p>{user.email}</p>
          </div>

          <div className="mb-4">
            <strong className="block">Total Score:</strong>
            <p>{user.totalScore}</p>
          </div>

          <div className="mb-4">
            <strong className="block">Quiz Attempts:</strong>
            <p>   {user.quizAttempts}</p>
          </div>

          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
