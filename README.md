# Blaze Engineer Node.js Client

&#x20;&#x20;

Easily interact with the [Blaze Engineer API](https://api.blaze.engineer/) in Node.js applications.

This package provides a modern, promise-based Node.js class for rapid automation, scripting, and integration with Blaze Engineer for GitOps, CI/CD, and code automation.

---

## Features

- **Simple, modern API:** All Blaze Engineer API endpoints, with auto-caching of your auth token
- **Promise-based:** Async/await for all methods
- **Handles authentication:** Login/signup sets and manages your Bearer token
- **Returns all response data:** Including error messages, so you can handle errors your way
- **No dependencies:** Uses Node.js’s native `fetch` (Node 18+)

---

## Install

```bash
npm install blaze-engineer
```

---

## Quickstart

```js
import { BlazeEngineer } from 'blaze-engineer';

const blaze = new BlazeEngineer();

// 1. Signup (or login)
await blaze.signup('me@example.com', 'MySecretPassword', 'YOUR_BETA_KEY');
// or: await blaze.login('me@example.com', 'MySecretPassword');

// 2. Add SSH Key
await blaze.addKey('My SSH Key', 'PRIVATE_KEY_HERE');

// 3. Add a Repo
await blaze.addRepo('MyRepo', 'git@github.com:user/repo.git', 'keyID_here');

// 4. Run a Job
const job = await blaze.runJob({ repoID: 'repoID_here', branch: 'main', task: 'analyze' });

// 5. View Jobs
const jobs = await blaze.listJobs();

console.log(jobs);
```

---

## API

Every method returns the raw JSON response from the Blaze Engineer API, including the `error` field if one occurs.

### Users

| Method                             | Description                                                                |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `signup(email, password, betaKey)` | Sign up for a new user account; requires a beta key; stores returned token |
| `login(email, password)`           | Log in as existing user; stores returned token                             |

### Keys

| Method              | Description            |
| ------------------- | ---------------------- |
| `addKey(name, key)` | Add an SSH private key |
| `removeKey(id)`     | Remove a key by ID     |
| `listKeys()`        | List all added keys    |

### Repos

| Method                         | Description               |
| ------------------------------ | ------------------------- |
| `addRepo(name, sshURL, keyID)` | Add a new repository      |
| `removeRepo(id)`               | Remove a repository by ID |
| `listRepos()`                  | List all repositories     |

### Jobs

| Method                                     | Description      |
| ------------------------------------------ | ---------------- |
| `runJob({repoID, branch, task, webhook?})` | Start a job      |
| `stopJob(jobID)`                           | Stop a job       |
| `rerunJob(jobID)`                          | Rerun a job      |
| `viewJob(id)`                              | View a job by ID |
| `listJobs()`                               | List all jobs    |

### Credits

| Method          | Description                 |
| --------------- | --------------------------- |
| `viewCredits()` | View your available credits |

---

## Error Handling

If an API response contains an `error` field, it is returned as part of the response. The class never throws on API errors—handle them as you need:

```js
const res = await blaze.addRepo('BadName', 'badurl', 'badkey');
if (res.error) {
  console.error('Blaze Engineer error:', res.error);
}
```

---

## Requirements

- Node.js 18 or higher (uses global `fetch`)
- An account on [Blaze Engineer API](https://api.blaze.engineer/)

---

## License

MIT

---

## Links

- [Blaze Engineer API Docs](https://shanelarsonvideos.s3.us-east-1.amazonaws.com/apiDocumentation.html)
- [Getting Started Guide](https://shanelarsonvideos.s3.us-east-1.amazonaws.com/gettingStarted.html)

