const App = () => {
  return (
    <div>
      <BlogApp />
    </div>
  );
};
export default App;

("use client");

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function BlogApp() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("posts");
    if (saved) setPosts(JSON.parse(saved));
  }, []);

  const savePosts = (updated) => {
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  const addPost = () => {
    if (!title || !content) return;
    const newPost = { id: Date.now(), title, content };
    savePosts([newPost, ...posts]);
    setTitle("");
    setContent("");
  };

  const deletePost = (id) => {
    savePosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Blog Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={addPost}>Add Post</Button>
        </CardContent>
      </Card>

      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
            <Button
              variant="destructive"
              size="sm"
              className="mt-2"
              onClick={() => deletePost(post.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
