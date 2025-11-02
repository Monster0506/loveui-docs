"use client";

import { AvatarStack } from "../../../../../packages/avatar-stack";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";

const Example = () => (
  <AvatarStack animate>
    <Avatar>
      <AvatarImage src="https://github.com/loveconnor.png" />
      <AvatarFallback>CL</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/91501317?v=4" />
      <AvatarFallback>MO</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/loveconnor.png" />
      <AvatarFallback>CL</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://avatars.githubusercontent.com/u/91501317?v=4" />
      <AvatarFallback>MO</AvatarFallback>
    </Avatar>
  </AvatarStack>
);

export default Example;
