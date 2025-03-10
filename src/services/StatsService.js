import { Service } from "./Service.js";

export class StatsService extends Service {
  constructor() {
    super(
      import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/v1/stats`
        : "/api/v1/stats"
    );
  }

  async getLocations(params) {
    const queryString = new URLSearchParams(params).toString();
    return await this.request(`${this.baseUrl}/locations?${queryString}`);
  }

  async getStatusCount(params) {
    const queryString = new URLSearchParams(params).toString();
    return await this.request(`${this.baseUrl}/status?${queryString}`);
  }

  async getMonthlyCount() {
    return await this.request(`${this.baseUrl}/monthly`);
  }
}
