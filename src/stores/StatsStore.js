import { makeObservable, runInAction, observable, action } from "mobx";
import { StatsService } from "../services/StatsService";

class StatsStore {
  status = [];
  locations = [];
  monthlyCount = [];

  constructor() {
    makeObservable(this, {
      status: observable,
      locations: observable,
      monthlyCount: observable,
      fetchStatus: action,
      fetchLocations: action,
      fetchMonthlyCount: action,
    });
    this.StatsService = new StatsService();
  }

  async fetchStatus(params = {}) {
    try {
      const data = await this.StatsService.getStatusCount(params);
      runInAction(() => {
        this.status = data.status;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.isFetchingNextPage = false;
      });
    }
  }

  async fetchLocations(params = {}) {
    try {
      const data = await this.StatsService.getLocations(params);
      runInAction(() => {
        this.locations = data.locations;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.isFetchingNextPage = false;
      });
    }
  }

  async fetchMonthlyCount() {
    try {
      const data = await this.StatsService.getMonthlyCount();
      runInAction(() => {
        this.monthlyCount = data.stats;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
        this.isFetchingNextPage = false;
      });
    }
  }
}

export const statsStore = new StatsStore();
