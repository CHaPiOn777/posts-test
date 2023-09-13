import { useState, FC, useMemo } from "react";
import styles from "./Post.module.css";
import { FavoritesIcon } from "../../../images/icons/FavoritesIcon";
import { DialogueIcon } from "../../../images/icons/DialogueIcon";
import { Delete } from "../../../images/icons/Delete";
import { EditIcon } from "../../../images/icons/EditIcon";
import { TComments, TUser } from "../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Comments from "./Comments/Comments";
import { PostsSlice } from "../../../store/reducers/PostsSlice";
import { fetchPostsDelete } from "../../../store/reducers/ActionCreater";

export type TPost = {
  user: TUser[];
  body: string;
  id: number;
  title: string;
  comments: TComments[];
};
const Post: FC<TPost> = ({ title, body, id, user, comments }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.postReducer);
  const { toggleFavorites } = PostsSlice.actions;
  const { idChecked } = useAppSelector((state) => state.postReducer);
  const { addChecked } = PostsSlice.actions;

  const [checkedComments, setCheckedComments] = useState<boolean>(false);
  const { name } = user[0];

  const openComments = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setCheckedComments(!checkedComments);
  };

  const favoriteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    console.log(idChecked)
    idChecked.length > 0
      ? idChecked.map((item) => {
          dispatch(toggleFavorites(item));
        })
      : dispatch(toggleFavorites(id));
  };

  const activeFavorites = useMemo(() => {
    return favorites.some((item) => item === id);
  }, [favorites]);

  const isChecked = useMemo(() => {
    console.log(idChecked);
    return idChecked.some((item) => item === id);
  }, [idChecked, dispatch]);

  const deletePosts = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(fetchPostsDelete(idChecked));
  };

  return (
    <div
      className={
        isChecked ? `${styles.post} ${styles.postActive}` : styles.post
      }
      onClick={() => dispatch(addChecked(id))}
    >
      <h1 className={styles.title}>{title}</h1>
      <button
        className={
          isChecked || activeFavorites
            ? `${styles.button} ${styles.favorite} ${styles.buttonActive}`
            : `${styles.button} ${styles.favorite}`
        }
        onClick={(e) => favoriteClick(e)}
      >
        <FavoritesIcon
          strokeDefault={activeFavorites ? "rgb(255 0 240)" : "rgb(0 126 255)"}
        />
      </button>
      <p className={styles.description}>{body}</p>
      <div className={styles.footer}>
        <p className={styles.userName}>{name}</p>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={(e) => openComments(e)}>
            <DialogueIcon
              strokeDefault={
                checkedComments ? "rgb(255 0 240)" : "rgb(0 126 255)"
              }
            />
          </button>
          <button className={styles.button} onClick={(e) => deletePosts(e)}>
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
            comments.map((item, index) => {
              return (
                <Comments
                  key={index}
                  name={item.name}
                  email={item.email}
                  body={item.body}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Post;