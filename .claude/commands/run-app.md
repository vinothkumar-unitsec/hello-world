Start the React development server and open the app in the browser.

## 1. Check if port 3000 is already in use

On Windows, run:
```
netstat -ano | findstr :3000
```

If port 3000 is occupied, tell the user:
> "The dev server appears to already be running on port 3000. What would you like to do?
> (a) Open the browser at localhost:3000 as-is
> (b) Kill the existing process and restart fresh"

Wait for their response:
- If **(a)**: open `http://localhost:3000` in the browser (see step 4) and stop — no need to restart.
- If **(b)**: find the PID from the netstat output and kill it with `taskkill /PID <pid> /F`, then continue to step 2.

## 2. Start the dev server

Run `npm start` in the background. This launches `react-scripts` at `http://localhost:3000` with hot reload. The server stays running after this command returns — do not wait for it to exit.

## 3. Wait for the server to be ready

Watch the output for the message `Compiled successfully` or `webpack compiled`. If you don't see it within 30 seconds, check for errors in the output and report them to the user before proceeding.

## 4. Open the browser

Open the app in the default browser:
```
start http://localhost:3000
```

## 5. Confirm

Tell the user:
> "App is running at http://localhost:3000. The dev server is running in the background — press Ctrl+C in the terminal to stop it."

If there were any compilation warnings (not errors), mention them briefly so the user is aware.
