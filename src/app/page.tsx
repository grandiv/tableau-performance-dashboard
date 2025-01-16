import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="relative w-full h-full p-12">
      <Link href="/login">Click here to login</Link>
      <Link href="/register">Click here to register</Link>
    </div>
  );
};

export default page;
