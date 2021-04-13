import React from "react";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const Post = ({ post }) => {
  const converter = new QuillDeltaToHtmlConverter(post.content.ops, {});
  const contentHTML = converter.convert();
  const postDate = new Date(post.date).toDateString();

  return (
    <article className="post container">
      <h1>{ post.title }</h1>
      <h4>{ postDate }</h4>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: contentHTML }}
      />
    </article>
  );
};

export default Post;
