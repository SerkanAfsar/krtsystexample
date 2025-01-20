import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import RenkliTasUretimTalepleriContainer from "@/Containers/RenkliTasUretimTalepleri";



const RenkliUretimTalepleri = () => {
  return (
    <DefaultLayout>
      <RenkliTasUretimTalepleriContainer />
  </DefaultLayout>
  );
};

export default RenkliUretimTalepleri;