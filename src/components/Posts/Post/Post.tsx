import { useState, FC, useMemo, useCallback, SetStateAction } from "react";
import styles from "./Post.module.css";
import { FavoritesIcon } from "../../../images/icons/FavoritesIcon";
import { DialogueIcon } from "../../../images/icons/DialogueIcon";
import { Delete } from "../../../images/icons/Delete";
import { EditIcon } from "../../../images/icons/EditIcon";
import { TComments, TUser } from "../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Comments from "./Comments/Comments";
import { PostsSlice } from "../../../store/reducers/PostsSlice";
import {
  fetchPostsDelete,
  fetchPostsPatching,
} from "../../../store/reducers/ActionCreater";
import Modal from "../../Modal/Modal";

export type TPost = {
  user: TUser[];
  body: string;
  id: number;
  title: string;
  comments: TComments[];
};
const Post: FC<TPost> = ({ title, body, id, comments, user }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.postReducer);
  const { toggleFavorites } = PostsSlice.actions;
  const { idChecked } = useAppSelector((state) => state.postReducer);
  const { addChecked } = PostsSlice.actions;
  const [activePopup, setActivePopup] = useState<boolean>(false);
  const [textPopup, setTextPopup] = useState<string>("");

  const [checkedComments, setCheckedComments] = useState<boolean>(false);
  const { name } = user[0];

  const openComments = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setCheckedComments(!checkedComments);
  };

  const favoriteClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      idChecked.length > 0
        ? idChecked.map((item) => {
            dispatch(toggleFavorites(item));
          })
        : dispatch(toggleFavorites(id));
    },
    [id, idChecked]
  );

  const activeFavorites = useMemo(() => {
    return favorites.some((item) => item === id);
  }, [favorites, dispatch]);

  const isChecked = useMemo(() => {
    return idChecked.some((item) => item === id);
  }, [idChecked]);

  const deletePosts = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setTextPopup("Are you sure you want to delete the selected items?");
    setActivePopup(true);
  };

  const editPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    const titleInput = prompt(`Edit the post title: ${title}`);
    const bodyInput = prompt(`Edit post description: ${body}`);
    const userInput = prompt(`Edit the author of the post: ${name}`);
    dispatch(fetchPostsPatching(titleInput!, userInput!, bodyInput!, id));
  };

  return (
    <div
      className={
        isChecked ? `${styles.post} ${styles.postActive}` : styles.post
      }
      onClick={() => dispatch(addChecked(id))}
    >
      <Modal active={activePopup} setActive={setActivePopup}>
        <h3 className={styles.text}>{textPopup}</h3>
        <div className={styles.btns}>
          <button
            className={`${styles.btn} mt-7 mr-5`}
            onClick={() => {
              dispatch(fetchPostsDelete(idChecked));
              setActivePopup(false);
            }}
          >
            Yes
          </button>
          <button
            className={`${styles.btn} mt-7 mr-5`}
            onClick={() => setActivePopup(false)}
          >
            No
          </button>
        </div>
      </Modal>
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
          <button
            className={
              isChecked
                ? `${styles.button} ${styles.btnDelete} ${styles.buttonActive}`
                : `${styles.button} ${styles.btnDelete}`
            }
            onClick={(e) => deletePosts(e)}
          >
            <span className={styles.span}>Удалить</span>
            <Delete strokeDefault="rgb(0 126 255)" />
          </button>

          <button className={styles.button} onClick={(e) => openComments(e)}>
            <span className={styles.span}>Комментарии</span>
            <DialogueIcon
              strokeDefault={
                checkedComments ? "rgb(255 0 240)" : "rgb(0 126 255)"
              }
            />
          </button>

          <button className={styles.button} onClick={(e) => editPost(e)}>
            <span className={styles.span}>Редактировать</span>
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
