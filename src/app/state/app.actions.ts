import { createAction, props } from '@ngrx/store';
import { Post } from '../models/post';

export const loadPosts = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction(
  '[Posts] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const loadPostsFailed = createAction(
  '[Posts] Load Posts Failed',
  props<{ error: any }>()
);
export const setActivePost = createAction(
  '[Posts] Set Active Post',
  props<{ postId: number }>()
);
export const resetActivePost = createAction('[Posts] Reset Active Post');
export const setBackdropFalse = createAction('[UI] Set Backdrop False');
export const setBackdropTrue = createAction('[UI] Set Backdrop True');
export const toggleGridMode = createAction('[UI] Toggle Grid Mode');
