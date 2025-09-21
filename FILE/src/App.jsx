const App = () => {
  return (
    <div>
      <FileExplorer />
    </div>
  );
};
export default App;

("use client");

import { useState } from "react";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";

const mockFiles = [
  {
    id: 1,
    name: "src",
    type: "folder",
    children: [
      { id: 2, name: "App.tsx", type: "file" },
      {
        id: 3,
        name: "components",
        type: "folder",
        children: [{ id: 4, name: "Header.tsx", type: "file" }],
      },
    ],
  },
  { id: 5, name: "package.json", type: "file" },
];

function FileNode({ node }) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.type === "folder" && node.children?.length;

  return (
    <div className="ml-4">
      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-80"
        onClick={() => setOpen(!open)}
      >
        {hasChildren &&
          (open ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        {node.type === "folder" ? <Folder size={16} /> : <File size={16} />}
        <span>{node.name}</span>
      </div>
      {open &&
        hasChildren &&
        node.children.map((child) => <FileNode key={child.id} node={child} />)}
    </div>
  );
}

function FileExplorer() {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">📁 File Explorer</h2>
      {mockFiles.map((node) => (
        <FileNode key={node.id} node={node} />
      ))}
    </div>
  );
}
