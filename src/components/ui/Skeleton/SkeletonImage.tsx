import React from "react";
import ContentLoader from "react-content-loader";

export const ClassicPostLoader = (props: any) => {
  return (
    <ContentLoader viewBox="0 0 1360 900" height={340} width={425} {...props}>
      <rect x="0" y="0" rx="2" ry="2" width="425" height="340" />
    </ContentLoader>
  );
};
