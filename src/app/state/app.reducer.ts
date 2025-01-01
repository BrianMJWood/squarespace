import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { Post } from '../models/post';

export interface AppState {
  posts: Post[];
  activePostId: number | null;
  showBackdrop: boolean;
  isFlexible: boolean;
}

export const initialState: AppState = {
  posts: [],
  activePostId: null,
  showBackdrop: false,
  isFlexible: true,
};

export const appReducer = createReducer(
  initialState,

  on(AppActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts: posts.map((post) => ({
      ...post,
      displayProperty: undefined,
    })),
  })),

  on(AppActions.loadPostsFailed, (state) => ({
    ...state,
    posts: [],
  })),

  on(AppActions.setActivePost, (state, { postId }) => {
    if (state.activePostId === postId) {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                displayProperty: getNextDisplayProperty(
                  post.displayProperty ?? ('title' as 'title')
                ),
              }
            : post
        ),
      };
    } else {
      return {
        ...state,
        activePostId: postId,
        showBackdrop: true,
        posts: state.posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                displayProperty: 'title' as 'title',
              }
            : post
        ),
      };
    }
  }),

  on(AppActions.resetActivePost, (state) => ({
    ...state,
    activePostId: null,
    posts: state.posts.map((post) => ({
      ...post,
      displayProperty: undefined,
    })),
  })),

  on(AppActions.setBackdropFalse, (state) => ({
    ...state,
    showBackdrop: false,
  })),

  on(AppActions.setBackdropTrue, (state) => ({
    ...state,
    showBackdrop: true,
  })),

  on(AppActions.toggleGridMode, (state) => ({
    ...state,
    isFlexible: !state.isFlexible,
  }))
);

function getNextDisplayProperty(
  currentProperty: 'title' | 'userId' | 'id' | 'body' = 'title'
): 'title' | 'userId' | 'id' | 'body' {
  switch (currentProperty) {
    case 'title':
      return 'userId';
    case 'userId':
      return 'id';
    case 'id':
      return 'body';
    case 'body':
    default:
      return 'title';
  }
}
