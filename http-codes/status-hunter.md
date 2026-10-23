# Status Code Hunter

## 1. A 404
- URL: https://github.com/this-route-does-not-exist-123
- Status Code: 404 Not Found

## 2. A redirect
### Browser
- URL: http://github.com/
- Status Code: 307 Internal Redirect
- Location: https://github.com/
- Note: 307 Internal Redirect (HSTS, the server was never contacted)

### curl
- URL: http://github.com
- Status Code: HTTP/1.1 301 Moved Permanently
- Location: https://github.com/
- Changes: http:// to https://, and the / at the end

### Why does GitHub redirect?
So nobody can use the site without encryption, not even by accident. If someone writes *http://*, the server will respond with a permanent 301 redirect to *https://*. Also with *HSTS*, it asks the browser to remember to do the change by itself.

## 3. Cache

| File | Hard reload (Ctrl+Shift+R) | Normal reload (F5) |
| --- | --- | --- |
| index-B_skhsQv.js | 200 / 159 kB | 200 / memory cache |
| primer-react-C9RU4jiF.js | 200 / 148 kB | 200 / memory cache |
| router-DteMNsjR.js | 200 / 47.6 kB | 200 / memory cache|

### What does memory cache mean?
The browser used a copy of the file requested, so it did not contact the server. The 200 is the status of the original response, saved with the file.

### What is the difference between memory cache and a 304 case?
With (memory cache), the browser uses its stored copy without asking the server. With a 304, the browser asks the server if the file changed, and the server answers Not Modified, so the file is not downloaded again.

## 4. A missing local file

- URL: file://wsl.localhost/Ubuntu/home/hector/proyectos/node-basico/http-codes/no-file.html
- What the page showed: ERR_FILE_NOT_FOUND
- Status in Network: failed

### Did I get a 404? Why?
Before testing, I expected a 404 code on screen, instead I received a Your file couldn't be accessed. This happens because there is no server. With file://, the browser reads the file directly from the disk, so nobody sends an HTTP response, and the browser shows its own error.