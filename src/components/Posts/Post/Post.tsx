import { useState, FC } from "react";
import styles from "./Post.module.css";
import { FavoritesIcon } from "../../../images/icons/FavoritesIcon";
import { DialogueIcon } from "../../../images/icons/DialogueIcon";
import { Delete } from "../../../images/icons/Delete";
import { EditIcon } from "../../../images/icons/EditIcon";
import { getComments } from "../../../api/api";
import { TUser } from "../../../../types/types";

export type TPost = {
  user: TUser[];
  body: string;
  id: number;
  title: string;
}
const Post: FC<TPost> = ({ title, body, id, user }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>();
  const [checkedComments, setCheckedComments] = useState<boolean>(false);
  const { name } = user[0];
  console.log(comments)
  const chengeCheckbox = () => {
    setChecked(!checked);
  };

  const openComments = (e: any) => {
    e.stopPropagation();
    setCheckedComments(!checkedComments);
    getComments(id).then((res) => setComments(res));
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
            comments.map((comment) => {
              return (
                <div className={styles.comment}>
                  <h2 className={styles.name}>{comment.name}</h2>
                  <p className={styles.email}>{comment.email}</p>
                  <p className={styles.body}>{comment.body}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Post;
