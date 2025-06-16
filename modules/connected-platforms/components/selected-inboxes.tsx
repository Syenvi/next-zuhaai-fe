import React from "react";

const SelectedInboxes = () => {
  return (
    <div className="border rounded-lg p-3 lg:p-5 flex-[2] flex flex-col justify-center items-center">
      <h3 className="text-neutral-700 font-semibold text-center">
        No Inbox Selected
      </h3>
      <p className="text-sm text-neutral-500 text-center">
        Select an inbox from the list to view and manage its settings.
      </p>
    </div>
  );
};

export default SelectedInboxes;
