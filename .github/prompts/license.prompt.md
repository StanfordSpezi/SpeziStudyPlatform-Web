---
mode: "edit"
---

Add a license file header to the document. It should have this structure:

```
//
// This source file is part of the Stanford Spezi open source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//
```

Make sure to adapt the comment style to the language of the file. For example, if it is a Markdown file, use `<!-- -->` for comments. If it is a YAML file, use `#` for comments.
Use line comments for these languages: javascript, typescript, javascriptreact, typescriptreact, dockerfile, yaml, jsonc.
Block comments for everything else.
