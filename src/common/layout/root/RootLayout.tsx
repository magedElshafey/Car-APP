import { Outlet, ScrollRestoration } from "react-router-dom";
import useLocalizeDocumentAttributes from "../../hooks/useLocalizeDocumentAttributes";
const RootLayout = () => {
  useLocalizeDocumentAttributes();

  return (
    <>
      <ScrollRestoration
        getKey={(location) => location.pathname + location.search}
      />
      <Outlet />
    </>
  );
};

export default RootLayout;
