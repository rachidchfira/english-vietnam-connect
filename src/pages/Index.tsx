
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Use Navigate component instead of useNavigate hook
  // This avoids the component rendering and then redirecting
  return <Navigate to="/" replace />;
};

export default Index;
