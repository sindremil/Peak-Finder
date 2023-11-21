import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function usePageTitle(title: string): void {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} | Peak Finder`;
  }, [title, location.pathname]);
}
