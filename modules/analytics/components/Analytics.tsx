"use client";

import { DatePicker, Divider } from "antd";
import React from "react";
import TotalConversation from "./total-conversation";
import PeakChatHours from "./peak-chat-hours";

const AnalyticsView = () => {
  const { RangePicker } = DatePicker;
  return (
    <div className="flex flex-col gap-3 lg:gap-5 flex-1">
      <h3 className="text-neutral-700 lg:text-xl font-medium">
        Conversation Analytics
      </h3>
      <Divider className="!my-0 !max-w-max" />
      <div className="max-w-[300px]">
        <RangePicker />
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <TotalConversation />
        <PeakChatHours />
      </div>
    </div>
  );
};

export default AnalyticsView;
