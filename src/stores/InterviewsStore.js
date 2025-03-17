import {
  makeObservable,
  runInAction,
  observable,
  action,
  computed,
} from "mobx";
import { InterviewsService } from "../services/InterviewsService";

import { jobsStore } from "./JobsStore";

class InterviewsStore {
  isLoading = false;
  error = null;
  interviews = [];
  constructor() {
    makeObservable(this, {
      interviews: observable,
      error: observable,
      isLoading: observable,
      upcomingInterviews: computed,
      pastInterviews: computed,
      fetchInterviews: action,
      saveInterview: action,
      deleteInterview: action,
    });
    this.InterviewsService = new InterviewsService();
  }

  get upcomingInterviews() {
    return this.interviews.filter(
      (interview) =>
        new Date(interview.datetime).getTime() >= new Date().getTime()
    );
  }

  get pastInterviews() {
    return this.interviews.filter(
      (interview) =>
        new Date(interview.datetime).getTime() < new Date().getTime()
    );
  }

  async fetchInterviews() {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await this.InterviewsService.getInterviews();
      runInAction(() => {
        this.interviews = data.interviews;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async saveInterview(data) {
    this.isLoading = true;
    this.error = null;
    try {
      await this.InterviewsService.createInterview(data);
      runInAction(() => {
        this.fetchInterviews();
        jobsStore.fetchJob(jobsStore.currentJob.id);
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

  async deleteInterview(id) {
    this.isLoading = true;
    this.error = null;
    try {
      await this.InterviewsService.deleteInterview(id);
      runInAction(() => {
        this.fetchInterviews();
        jobsStore.fetchJob(jobsStore.currentJob.id);
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
}

export const interviewsStore = new InterviewsStore();
