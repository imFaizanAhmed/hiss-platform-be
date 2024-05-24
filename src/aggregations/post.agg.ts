import { PipelineStage, Types } from 'mongoose';

export const getPostAggr = (_id: Types.ObjectId) => [
  {
    $match: {
      _id, // Match the post by ID
    },
  },
  {
    $lookup: {
      from: 'creators', // the collection to join
      localField: 'creatorId', // field from the input documents
      foreignField: '_id', // field from the documents of the "from" collection
      as: 'creator', // output array field
    },
  },
  {
    $unwind: '$creator', // Convert the array field to an object
  },
  {
    $limit: 1, // Ensure that no more than one document is returned
  },
];

export const getPaginatingPostsAggr = ({ page, limit }): PipelineStage[] => [
  {
    $lookup: {
      from: 'creators', // the collection to join
      localField: 'creatorId', // field from the input documents
      foreignField: '_id', // field from the documents of the "from" collection
      as: 'creator', // output array field
    },
  },
  {
    $addFields: {
      creator: { $arrayElemAt: ['$creator', 0] }, // extract the first element from the creator array
    },
  },
  {
    $addFields: {
      comments: {
        $slice: ['$comments', 4], // Limit comments to 4
      },
    },
  },
  {
    $sort: { updatedAt: -1 }, // Sort by updatedAt in descending order
  },
  {
    $facet: {
      data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
      hasMoreCheck: [{ $skip: page * limit }, { $limit: 1 }],
    },
  },
  {
    $project: {
      'data.creator': 1,
      'data.creatorId': 1,
      'data.content': 1,
      'data.media': 1,
      'data.totalLikes': 1,
      'data.likedBy': 1,
      'data.comments': 1,
      hasMore: { $gt: [{ $size: '$hasMoreCheck' }, 0] },
    },
  },
];

export const setLikesCommentOfPost = ({
  commentId,
  postId,
  likeCount,
}: {
  commentId: number;
  postId: Types.ObjectId;
  likeCount: number;
}) => [
  // Match the post with the given ID
  { $match: { _id: postId } },
  // Deconstruct the comments array
  { $unwind: '$comments' },
  // Match the comment with the given ID
  { $match: { 'comments.id': commentId } },
  {
    $set: {
      'comments.totalLikes': likeCount,
    },
  },
];

export const getPaginatingComments = ({
  page,
  limit,
  postId,
}: {
  limit: number;
  page: number;
  postId: Types.ObjectId;
}): PipelineStage[] => [
  // Unwind the comments array
  { $unwind: '$comments' },

  // Add a field to preserve the post id
  { $addFields: { postId } },

  // Project the necessary fields
  {
    $project: {
      _id: 0, // Exclude the original _id field of post
      postId: 1,
      comment: '$comments',
    },
  },

  // Skip the comments for previous pages
  { $skip: (page - 1) * limit },

  // Limit the number of comments
  { $limit: limit },
];
