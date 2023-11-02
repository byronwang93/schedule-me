import { Box } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import CalculateShifts from "./CalculateShifts";
import DayHours from "./DayHours";
import DaySelection from "./DaySelection";
import DayShiftList from "./DayShiftList";
import LandingPage from "./LandingPage";
import OrganizerNames from "./OrganizerNames";
import Shifts from "./Shifts";
import UnavailableIncrements from "./UnavailableIncrements";
import UnavailableTable from "./UnavailableTable";

// export const DataContext = createContext();

const AppContext = () => {
  //   const [data, setData] = useState({});
  const { data, setData } = useContext(DataContext);
  const [page, setPage] = useState(0);

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <Box>
      {page === 0 && <LandingPage onNext={handleNext} />}
      {page === 1 && <OrganizerNames onPrev={handlePrev} onNext={handleNext} />}
      {page === 2 && <DaySelection onPrev={handlePrev} onNext={handleNext} />}
      {page === 3 && <DayHours onPrev={handlePrev} onNext={handleNext} />}
      {page === 4 && <DayShiftList onPrev={handlePrev} onNext={handleNext} />}
      {page === 5 && (
        <UnavailableIncrements onPrev={handlePrev} onNext={handleNext} />
      )}
      {page === 6 && (
        <UnavailableTable onPrev={handlePrev} onNext={handleNext} />
      )}
      {page === 7 && (
        <CalculateShifts onPrev={handlePrev} onNext={handleNext} />
      )}
      {page > 7 && <Shifts onPrev={handlePrev} onNext={handleNext} />}
    </Box>
  );
};

export default AppContext;
