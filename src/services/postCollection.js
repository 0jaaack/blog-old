import fs from "fs/promises";
import path from "path";
import fm from "front-matter";

import POST from "../configs/post";

class PostCollection {
  constructor() {
    this.posts = [];
    this.queue = Promise.resolve();
  }

  async _getAllPosts() {
    return await fs.readdir(
      path.join(process.cwd(), "posts"),
      { recursive: true },
    );
  }

  getPosts() {
    this.chain(async () => {
      return this.posts;
    });

    return this.queue;
  }

  getTags() {
    this.chain(async () => {
      const files = await this._getAllPosts();
      const tagList = await Promise.all(
        files.map(async (post) => {
          const file = await fs.readFile(
            path.join(process.cwd(), "posts", post),
            { encoding: "utf8" },
          );

          return fm(file).attributes.tags;
        })
      );
      const tagData = tagList
        .reduce((acc, cur) => acc.concat(cur), [])
        .reduce((acc, cur) => {
          if (!!acc[cur]) {
            return Object.assign(acc, { [cur]: acc[cur] + 1 });
          }

          return Object.assign(acc, { [cur]: 1 });
        }, {});

      return Object.keys(tagData)
        .sort((a, b) => tagData[b] - tagData[a])
        .map((key) => [key, tagData[key]]);
    });

    return this;
  }

  getPage(pageIndex) {
    this.chain(async () => {
      const files = await this._getAllPosts();

      this.posts = files
        .slice(pageIndex - 1, pageIndex + POST.DEFAULT_NUMBER_OF_POSTS);
    });

    return this;
  }

  read(...attributes) {
    this.chain(async () => {
      this.posts = await Promise.all(
        this.posts.map(async (post) => {
          const file = await fs.readFile(
            path.join(process.cwd(), "posts", post),
            { encoding: "utf8" },
          );
          const content = fm(file);

          return attributes.reduce((acc, cur) => {
            let currentAttr = content.attributes[cur];

            if (currentAttr instanceof Date) {
              currentAttr = currentAttr.toISOString();
            }

            return Object.assign(acc, { [cur]: currentAttr });
          }, {});
        })
      );
    });

    return this;
  }

  then(callback) {
    callback(this.queue);
  }

  chain(callback) {
    return this.queue = this.queue.then(callback);
  }
}

export default PostCollection;
