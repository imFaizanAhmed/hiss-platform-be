export interface getPostResposeType {
  creatorId: string;
  content: string;
  reactions: { reaction: string; creatorId: string }[];
  comments: {
    id: number;
    creatorId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    replies: {
      id: number;
      userId: string;
      content: string;
      reactions: { reaction: string; creatorId: string }[];
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    }[];
  }[];
  file?: Buffer;
}
