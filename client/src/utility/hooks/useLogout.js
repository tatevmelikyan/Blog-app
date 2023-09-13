import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function useLogout(isLogoutSuccess) {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLogoutSuccess) {
      navigate("/login");
      window.location.reload();
    }
  }, [isLogoutSuccess, navigate]);
}
