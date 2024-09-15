'use client';
import EditBitacora from "../front-extras/components/EditBitacora";
import Bitacora from "../front-extras/components/Bitacora";
import Menu from "../front-extras/components/Menu";
import TopMenu from "../front-extras/components/TopMenu";
import Image from "next/image";

import { useState, useEffect } from 'react';

export default function Home() {
  const [getMessage, setGetMessage] = useState('');
  const [postMessage, setPostMessage] = useState('');
  const [loading, setLoading] = useState(true);

  

  return (
    <div>

      <TopMenu/>

      <EditBitacora/>
      <Bitacora/>
      <Bitacora/>
      <Bitacora/>
      <Bitacora/>
      <Bitacora/>
      <Bitacora/>
      <Bitacora/>

      <Menu/>
    </div>
    

  );
}
