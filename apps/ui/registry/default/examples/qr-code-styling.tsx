"use client";

import { QRCode } from "../../../../../packages/qr-code";

const Example = () => (
  <QRCode
    className="size-48 rounded border bg-white p-4 shadow-xs"
    data="https://www.connorlove.com/"
  />
);

export default Example;
