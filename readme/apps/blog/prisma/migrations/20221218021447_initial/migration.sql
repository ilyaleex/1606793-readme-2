-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('LINK', 'PHOTO', 'QUOTE', 'TEXT', 'VIDEO');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "type" "ContentType" NOT NULL,
    "likes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isDraft" BOOLEAN NOT NULL DEFAULT false,
    "isRepost" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userID" TEXT NOT NULL,
    "authorID" TEXT,
    "originID" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "postID" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "postID" INTEGER NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'LINK',
    "url" TEXT NOT NULL,
    "desc" TEXT,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("postID")
);

-- CreateTable
CREATE TABLE "Photo" (
    "postID" INTEGER NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'PHOTO',
    "photo" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("postID")
);

-- CreateTable
CREATE TABLE "Quote" (
    "postID" INTEGER NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'QUOTE',
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("postID")
);

-- CreateTable
CREATE TABLE "Text" (
    "postID" INTEGER NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'TEXT',
    "title" TEXT NOT NULL,
    "ann" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Text_pkey" PRIMARY KEY ("postID")
);

-- CreateTable
CREATE TABLE "Video" (
    "postID" INTEGER NOT NULL,
    "type" "ContentType" NOT NULL DEFAULT 'VIDEO',
    "title" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("postID")
);

-- CreateTable
CREATE TABLE "Tag" (
    "title" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("title")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_originID_key" ON "Post"("originID");

-- CreateIndex
CREATE UNIQUE INDEX "Link_postID_key" ON "Link"("postID");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_postID_key" ON "Photo"("postID");

-- CreateIndex
CREATE UNIQUE INDEX "Quote_postID_key" ON "Quote"("postID");

-- CreateIndex
CREATE UNIQUE INDEX "Text_postID_key" ON "Text"("postID");

-- CreateIndex
CREATE UNIQUE INDEX "Video_postID_key" ON "Video"("postID");

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTag_AB_unique" ON "_PostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_originID_fkey" FOREIGN KEY ("originID") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Text" ADD CONSTRAINT "Text_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("title") ON DELETE CASCADE ON UPDATE CASCADE;
