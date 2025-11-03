"use client";

import {
  Banner,
  BannerAction,
  BannerClose,
  BannerIcon,
  BannerTitle,
} from "../../../../../packages/banner";
import { CircleAlert } from "lucide-react";

const Example = () => (
  <Banner>
    <BannerIcon icon={CircleAlert} />
    <BannerTitle>Scheduled maintenance tonight from 1-3 AM Pacific.</BannerTitle>
    <BannerAction>View status page</BannerAction>
    <BannerClose />
  </Banner>
);

export default Example;
