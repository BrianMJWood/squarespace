import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.reducer';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectPosts = createSelector(
  selectAppState,
  (state: AppState) => state.posts
);

export const selectActivePostId = createSelector(
  selectAppState,
  (state: AppState) => state.activePostId
);

export const selectActivePost = createSelector(
  selectPosts,
  selectActivePostId,
  (posts, activePostId) => posts.find((post) => post.id === activePostId)
);

export const selectShowBackdrop = createSelector(
  selectAppState,
  (state: AppState) => state.showBackdrop
);

export const selectIsFlexible = createSelector(
  selectAppState,
  (state: AppState) => state.isFlexible
);
