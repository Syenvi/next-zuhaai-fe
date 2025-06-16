"use client";
import React from "react";
import Inboxes from "./inboxes";
import SelectedInboxes from "./selected-inboxes";

const ConnectedPlatformsView = () => {
  return (
    <section className="flex flex-col lg:flex-row flex-1 gap-5">
      <Inboxes />
      <SelectedInboxes />
    </section>
  );
};

export default ConnectedPlatformsView;
