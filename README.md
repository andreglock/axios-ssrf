# Get Started

- run `pnpm install` on the root, backend, and frontend directories
- run `pnpm start:dev` on the root directory

## Vulnerabilities

### Server Side Request Forgery:

I specifically used a version of axios that is vulnerable to SSRF attacks.

- Go to the search bar and type an absolute URL like `http://example.com`

### Path Traversal:

The downloads middleware is vulnerable to path traversal attacks. Because this is not a conventional controller this
can't be detected by the SAST tools (semgrep and checkmarx).

- https://axios-ssrf.onrender.com/api/downloads/linda/..%2f..%2f..%2fmain.ts
- https://axios-ssrf.onrender.com/api/downloads/linda/..%2f..%2f..%2fdist%2fmain.ts

Path traversal inside downloads controller for localhost:

- http://localhost:3000/api/downloads/linda/..%2fnick%2fnick-scared-face.png
