// Back End Main File

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { readdir, stat } = require('fs/promises');
const { promisify } = require('util')
const fastFolderSize = require('fast-folder-size')
const fastFolderSizeSync = require('fast-folder-size/sync')

const app = express();
app.use(bodyParser.json());
app.use(cors());

var mainDirectory = __dirname + "/MainDirectory/";

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

function generateTree(nodePath, maxDepth) {
  if (maxDepth < 0) return null;

  if (path.basename(nodePath).startsWith(".")) return null;

  let cleanPath = nodePath.replace(mainDirectory,"");
  let nodeName = path.basename(nodePath);
  let isDir = fs.lstatSync(nodePath).isDirectory();
  let isFile = fs.lstatSync(nodePath).isFile();

  const node = isDir ? {
    path: cleanPath,
    name: nodeName,
    type: 'dir',
    size: fastFolderSizeSync(nodePath),
    children: []
  } : {
    path: cleanPath,
    name: nodeName,
    type: 'file',
    size: getFileSize(nodePath),
  };

  if (isDir) {
    const children = fs.readdirSync(nodePath);
    for (const child of children) {
      const childPath = path.join(nodePath, child);
      const childNode = generateTree(childPath, maxDepth - 1);
      if (childNode) {
        node.children.push(childNode);
      }
    }
  }

  return node;
}

// POST API
app.post('/directoryToTree', (req, res) => {
  const { rootPath, maxDepth } = req.body;
  if (!rootPath 
    //|| !maxDepth
    ) {
    return res.status(400).json({ error: 'Both rootPath and maxDepth are required.' });
  }

  let completeRootPath = mainDirectory + rootPath;

  const directoryTree = generateTree(completeRootPath, maxDepth);
  res.json(directoryTree);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
