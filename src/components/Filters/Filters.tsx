import React from "react";
import styles from "./Filter.module.css";
import { SearchIcon } from "../../images/icons/SearchIcon";
import { useAppSelector } from "../../hooks/redux";
import { Arrow } from "../../images/icons/Arrow";
import FilterIcon from "../../images/icons/FilterIcon";
import Sorted from "./Sorted/Sorted";
import Filtred from "./Filtred/Filtred";

const Filters = () => {

  return (
    <div className={styles.containerFilter}>
      <h2 className="title"></h2>

      <form className={styles.form}>
        <div className={styles.searchContainer}>
          <i className={styles.searchIcon}>
            <SearchIcon strokeDefault={"#0000004d"} size={20} />
          </i>
          <input
            className={styles.input}
            placeholder={"Поиск по названию поста..."}
          />
        </div>
        <div className={styles.container}>
          <Filtred />
          <Sorted />
        </div>
      </form>
    </div>
  );
};

export default Filters;
