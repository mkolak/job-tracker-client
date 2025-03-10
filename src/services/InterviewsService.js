import { Service } from "./Service.js";

export class InterviewsService extends Service {
  constructor() {
    super(
      import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/v1/interviews`
        : "/api/v1/interviews"
    );
  }

  async getInterviews() {
    return await this.request(this.baseUrl);
  }

  async createInterview(newInterview) {
    return await this.request(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInterview),
    });
  }

  async deleteInterview(id) {
    return await this.request(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
