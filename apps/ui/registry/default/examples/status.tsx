"use client";

import { Status, StatusIndicator, StatusLabel } from "../../../../../packages/status";

const Example = () => (
  <div className="flex gap-2">
    <Status status="online">
      <StatusIndicator />
      <StatusLabel />
    </Status>

    <Status status="offline">
      <StatusIndicator />
      <StatusLabel />
    </Status>

    <Status status="maintenance">
      <StatusIndicator />
      <StatusLabel />
    </Status>

    <Status status="degraded">
      <StatusIndicator />
      <StatusLabel />
    </Status>
  </div>
);

export default Example;
