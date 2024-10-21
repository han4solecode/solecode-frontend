import React, { useState } from "react";
import Tombol from "./Tombol";
import styles from "./Belajar.module.css";

const Belajar = () => {
  const [judul, setJudul] = useState("React");

  const handleTombolClick = (judul) => {
    setJudul(judul);
  };

  return (
    <>
      <h1 className={styles.judul}>Belajar {judul}</h1>
      <Tombol onTombolClick={handleTombolClick}>React</Tombol>
      <Tombol onTombolClick={handleTombolClick}>Javascript</Tombol>
    </>
  );
};

export default Belajar;
