import React, { useState } from "react";
import Input from "./Input";
import AddedLocations from "./AddedLocations";
import LocationModal from "./LocationModal";
import MessageBox from "./MessageBox";

function Main() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchLocationData, setSearchLocationData] = useState([]);

  // Handle setting modal as open.
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <main className="relative flex flex-col items-center w-full h-full pt-10 bg-none">
      <MessageBox
        title={"Hello!"}
        innerText={
          "Welcome to WTF! Simply type a location into the search bar to get started. Click the cancel button or press ENTER to clear your search."
        }
      />
      {modalOpen && (
        <LocationModal
          locationData={searchLocationData}
          closeModal={closeModal}
        />
      )}
      <Input openModal={openModal} setData={setSearchLocationData} />
      <AddedLocations openModal={openModal} setData={setSearchLocationData} />
    </main>
  );
}

export default Main;
