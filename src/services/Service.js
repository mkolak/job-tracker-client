export class Service {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(url, options = {}) {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Request failed");
    }
    return data;
  }
}
