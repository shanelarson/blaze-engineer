export default class BlazeEngineer {
    #token = null;
    #apiBase = 'https://api.blaze.engineer/';

    /**
     * Get the currently cached auth token.
     */
    get token() {
        return this.#token;
    }

    /**
     * Set the token manually if needed.
     */
    set token(value) {
        this.#token = value;
    }

    // --- Helper: Internal API request ---
    async #post(endpoint, body, authorized = false) {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (authorized && this.#token) {
            headers['Authorization'] = `Bearer ${this.#token}`;
        }
        const res = await fetch(new URL(endpoint, this.#apiBase), {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
        let result;
        try {
            result = await res.json();
        } catch (e) {
            throw new Error('Invalid JSON from server');
        }
        // Save new token if in signup/login response
        if (endpoint === 'signup' || endpoint === 'login') {
            if (result.token) this.#token = result.token;
        }
        return result;
    }

    // --- Users ---
    async signup(email, password, betaKey) {
        return await this.#post('users/signup', { email, password, betaKey });
    }

    async login(email, password) {
        return await this.#post('users/login', { email, password });
    }

    // --- Keys (Authorized) ---
    async addKey(name, key) {
        return await this.#post('keys/add', { name, key }, true);
    }

    async removeKey(id) {
        return await this.#post('keys/remove', { id }, true);
    }

    async listKeys() {
        return await this.#post('keys/list', {}, true);
    }

    // --- Repos (Authorized) ---
    async addRepo(name, sshURL, keyID) {
        return await this.#post('repos/add', { name, sshURL, keyID }, true);
    }

    async removeRepo(id) {
        return await this.#post('repos/remove', { id }, true);
    }

    async listRepos() {
        return await this.#post('repos/list', {}, true);
    }

    // --- Jobs (Authorized) ---
    async runJob({ repoID, branch, task, webhook }) {
        const body = { repoID, branch, task };
        if (webhook) body.webhook = webhook;
        return await this.#post('jobs/run', body, true);
    }

    async stopJob(jobID) {
        return await this.#post('jobs/stop', { jobID }, true);
    }

    async rerunJob(jobID) {
        return await this.#post('jobs/rerun', { jobID }, true);
    }

    async viewJob(id) {
        return await this.#post('jobs/view', { id }, true);
    }

    async listJobs() {
        return await this.#post('jobs/list', {}, true);
    }

    // --- Tokens (Authorized) ---
    async addToken(name) {
        return await this.#post('tokens/add', { name }, true);
    }

    async removeToken(id) {
        return await this.#post('tokens/remove', { id }, true);
    }

    async viewToken(id) {
        return await this.#post('tokens/view', { id }, true);
    }

    async listTokens() {
        return await this.#post('tokens/list', {}, true);
    }

    // --- Credits (Authorized) ---
    async viewCredits() {
        return await this.#post('credits/view', {}, true);
    }

    // --- MasterFiles (Authorized) ---
    async editMasterFile(id, content) {
        return await this.#post('masterFiles/edit', { id, content }, true);
    }

    async viewMasterFile(id) {
        return await this.#post('masterFiles/view', { id }, true);
    }

    async listMasterFiles(repoID) {
        return await this.#post('masterFiles/list', { repoID }, true);
    }
}
