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
  <Banner inset>
    <BannerIcon icon={CircleAlert} />
    <BannerTitle>Your trial ends in 3 days. Add a payment method to stay live.</BannerTitle>
    <BannerAction>Update billing</BannerAction>
    <BannerClose />
  </Banner>
);

export default Example;
