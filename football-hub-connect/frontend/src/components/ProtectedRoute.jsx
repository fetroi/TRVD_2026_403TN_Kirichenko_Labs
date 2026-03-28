import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { session, profile } = useAuth();

  // 1. Якщо сесія ще завантажується - можна показати спінер
  if (session === undefined) return <p>Завантаження...</p>;

  // 2. Якщо користувач не залогінений - відправляємо на логін
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // 3. Якщо роль не підходить (наприклад, гравець лізе до тренера)
  if (allowedRoles && !allowedRoles.includes(profile?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 4. Якщо все ОК - показуємо контент сторінки
  return <Outlet />;
};

export default ProtectedRoute;