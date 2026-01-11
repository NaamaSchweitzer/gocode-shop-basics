import React from "react";
import { useParams } from "react-router";

export const ProductDetailsPage = () => {
  const params = useParams();

  return <div>ProductDetailsPage: {params.productId}</div>;
};
