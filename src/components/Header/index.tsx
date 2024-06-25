import React from "react";
import Text from "../Text";
import { Box } from "./style";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <Box>
      <Link href="/">
        <Image src="/logo.svg" alt="Pokédex" width={280} height={80} />
      </Link>
    </Box>
  );
}
