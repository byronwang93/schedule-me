import React, { useEffect } from "react";
import WebFont from "webfontloader";

const FontLoader = ({ fonts, children }) => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: fonts,
      },
    });
  }, [fonts]);

  return <>{children}</>;
};

export default FontLoader;
