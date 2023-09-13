export function isPostLikedByUser(post, userId) {
  return !!post.likedByUsers.find((likedByUser) => likedByUser.id === userId);
}
