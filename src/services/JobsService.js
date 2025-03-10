import { Service } from "./Service.js";

export class JobsService extends Service {
  constructor() {
    super(
      import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/v1/jobs`
        : "/api/v1/jobs"
    );
  }

  async getJobs(params = {}, pageParam = 0) {
    const queryString = new URLSearchParams({
      ...params,
      page: pageParam,
    }).toString();
    return await this.request(`${this.baseUrl}?${queryString}`);
  }

  async getJob(id) {
    return await this.request(`${this.baseUrl}/${id}`);
  }

  async createJob(newJob) {
    return await this.request(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
  }

  async editJob(id, job) {
    return await this.request(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
  }

  async deleteJob(id) {
    return await this.request(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
