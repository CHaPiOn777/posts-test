import React, { useState, useEffect, FC } from "react";
import styles from "./Post.module.css";
import { FavoritesIcon } from "../../../images/icons/FavoritesIcon";
import { DialogueIcon } from "../../../images/icons/DialogueIcon";
import { Delete } from "../../../images/icons/Delete";
import { EditIcon } from "../../../images/icons/EditIcon";
import { getUser } from "../../../api/api";
import { TPost, TUser } from "../../../../types/types";

const Post: FC<TPost> = ({ title, userId, body, id }) => {
  const [user, setUser] = useState<TUser>();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    userId && getUser(userId).then((res) => setUser(res));
  }, [userId]);

  function chengeCheckbox() {
    setChecked(!checked);
  }

  return (
    <div
      className={checked ? `${styles.post} ${styles.postActive}` : styles.post}
      onClick={chengeCheckbox}
    >
      <h1 className={styles.title}>{title}</h1>
      <button
        className={
          checked
            ? `${styles.button} ${styles.favorite} ${styles.buttonActive}`
            : `${styles.button} ${styles.favorite}`
        }
      >
        <FavoritesIcon strokeDefault="rgb(0 126 255)" />
      </button>
      <p className={styles.description}>{body}</p>
      <div className={styles.footer}>
        <p className={styles.userName}>{user && user.name}</p>
        <div className={styles.buttons}>
          <button className={styles.button}>
            <DialogueIcon strokeDefault="rgb(0 126 255)" />
          </button>
          <button className={styles.button}>
            <Delete
              strokeDefault="rgb(0 126 255)"
              strokeHovered="rgb(0 126 255 / 40%);"
            />
          </button>
          <button className={styles.button}>
            <EditIcon strokeDefault="rgb(0 126 255)" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
