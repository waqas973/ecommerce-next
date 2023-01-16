import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";

export default function Shipping() {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
  }, []);

  return <div>hi shipping</div>;
}
