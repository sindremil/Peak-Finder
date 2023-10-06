import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function SetPageTitle({ title }: { title: string }): null {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} | Peak Finder`;
  }, [title, location.pathname]);
  return null;
}

export default SetPageTitle;
