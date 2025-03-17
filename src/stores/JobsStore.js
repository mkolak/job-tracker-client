import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from "mobx";
import { JobsService } from "../services/JobsService";

class JobsStore {
  jobs = [];
  isLoading = false;
  isFetchingNextPage = false;
  error = null;
  currentPage = 1;
  totalJobs = 0;
  nextPage = null;
  currentJob = null;

  constructor() {
    makeObservable(this, {
      jobs: observable,
      isLoading: observable,
      error: observable,
      currentPage: observable,
      totalJobs: observable,
      nextPage: observable,
      currentJob: observable,
      jobsByStatus: computed,
      jobsByLocation: computed,
      deleteJob: action,
      fetchJobs: action,
      fetchJob: action,
      saveJob: action,
      fetchNextPage: action,
    });
    this.jobsService = new JobsService();
  }

  get jobsByStatus() {
    const counterObject = this.jobs.reduce((acc, job) => {
      acc[job.status] = acc[job.status] ? acc[job.status] + 1 : 1;
      return acc;
    }, {});
    return Object.keys(counterObject).map((key) => {
      return { _id: key, count: counterObject[key] };
    });
  }

  get jobsByLocation() {
    const counterObject = this.jobs.reduce((acc, job) => {
      acc[job.location] = acc[job.location] ? acc[job.location] + 1 : 1;
      return acc;
    }, {});
    return Object.keys(counterObject).map((key) => {
      return { _id: key, count: counterObject[key] };
    });
  }

  async fetchJobs(params = {}, page = 1) {
    if (page === 1) this.isLoading = true;
    else this.isFetchingNextPage = true;

    this.error = null;

    try {
      const data = await this.jobsService.getJobs(params, page);
      runInAction(() => {
        this.jobs = page === 1 ? data.jobs : [...this.jobs, ...data.jobs];

        this.totalJobs = data.nbHits;
        this.currentPage = data.currentPage;
        this.nextPage = data.nextPage;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.isFetchingNextPage = false;
        this.currentJob = null;
      });
    }
  }

  async fetchNextPage(params) {
    if (!this.nextPage) return;
    await this.fetchJobs(params, this.nextPage);
  }

  async deleteJob(id) {
    this.isLoading = true;
    try {
      await this.jobsService.deleteJob(id);
      runInAction(() => {
        this.fetchJobs({}, 1);
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async fetchJob(id) {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await this.jobsService.getJob(id);
      runInAction(() => (this.currentJob = data.job));
    } catch (error) {
      runInAction(() => (this.error = error));
      throw error;
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async saveJob(data, id) {
    this.isLoading = true;
    this.error = null;
    try {
      if (id) await this.jobsService.editJob(id, data);
      else await this.jobsService.createJob(data);
      runInAction(() => {
        this.fetchJobs({}, 1);
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
      });
      throw error;
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }
}

export const jobsStore = new JobsStore();
