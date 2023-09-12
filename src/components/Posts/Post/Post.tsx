import { useState, FC, useEffect } from "react";
import styles from "./Post.module.css";
import { FavoritesIcon } from "../../../images/icons/FavoritesIcon";
import { DialogueIcon } from "../../../images/icons/DialogueIcon";
import { Delete } from "../../../images/icons/Delete";
import { EditIcon } from "../../../images/icons/EditIcon";
import { TComments, TUser } from "../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchComments } from "../../../store/reducers/ActionCreater";

export type TPost = {
  user: TUser[];
  body: string;
  id: number;
  title: string;
  comments: TComments[];
}
const Post: FC<TPost> = ({ title, body, id, user, comments }) => {
  const dispatch = useAppDispatch();
  
  const [checked, setChecked] = useState<boolean>(false);
  // const [comments, setComments] = useState<any[]>();
  const [checkedComments, setCheckedComments] = useState<boolean>(false);
  const { name } = user[0];
  const chengeCheckbox = () => {
    setChecked(!checked);
  };

  
  const openComments = (e: any) => {
    e.stopPropagation();
    setCheckedComments(!checkedComments);
    
  };
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
        <p className={styles.userName}>{name}</p>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={(e) => openComments(e)}>
            <DialogueIcon strokeDefault={checkedComments ? 'rgb(255 0 240)': 'rgb(0 126 255)'} />
          </button>
          <button className={styles.button}>
            <Delete strokeDefault="rgb(0 126 255)" />
          </button>
          <button className={styles.button}>
            <EditIcon strokeDefault="rgb(0 126 255)" />
          </button>
        </div>
      </div>
      <div
        className={
          checkedComments
            ? `${styles.overlay} ${styles.overlayActive}`
            : styles.overlay
        }
        onClick={(e) => openComments(e)}
      >
        <div
          className={
            checkedComments
              ? `${styles.comments} ${styles.commentsActive}`
              : styles.comments
          }
        >
          {comments &&
            comments.map((item:any) => {
              return (
                <div className={styles.comment}>
                  <h2 className={styles.name}>{item.name}</h2>
                  <p className={styles.email}>{item.email}</p>
                  <p className={styles.body}>{item.body}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Post;
