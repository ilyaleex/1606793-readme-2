export const MAX_POSTS_COUNT = 25;

export const DEFAULT_PAGE = 1;

export const SortType = {
  Likes: 'likes',
  Comments: 'comments',
  Default: 'date'
};

export const SortTypeMap = {
  'likes': {
    likesCount: 'desc'
  },
  'comments': {
    comments: {
      _count: 'desc'
    }
  },
  'date': {
    date: 'desc'
  }
};

export const NOTIFIER_RABBITMQ_SERVICE = Symbol('NOTIFIER_RABBITMQ_SERVICE');

export const USERS_RABBITMQ_SERVICE = Symbol('USERS_RABBITMQ_SERVICE');
