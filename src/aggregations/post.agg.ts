import { Types } from 'mongoose';

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

export const getAllPostsAggr = ({ page, limit }) => [
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
      creator: { $arrayElemAt: ['$creator', 0] } // extract the first element from the creator array
    }
  },
  {
    $addFields: {
      comments: {
        $slice: ['$comments', 4] // Limit comments to 4
      }
    }
  },
  {
    $facet: {
      data: [
        { $skip: (page - 1) * limit },
        { $limit: limit },
      ],
      hasMoreCheck: [
        { $skip: page * limit },
        { $limit: 1 },
      ]
    }
  },
  {
    $project: {
      data: 1,
      hasMore: { $gt: [{ $size: "$hasMoreCheck" }, 0] }
    }
  }
];

