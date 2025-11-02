"use client";

import { ThemeSwitcher } from "../../../../../packages/theme-switcher";

const Example = () => (
  <ThemeSwitcher defaultValue="system" onChange={console.log} />
);

export default Example;
