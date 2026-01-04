import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.client.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          this.removeToken();
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(username: string, password: string, ageBand: string) {
    const response = await this.client.post('/auth/register', {
      username,
      password,
      ageBand,
    });
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response.data;
  }

  async login(username: string, password: string) {
    const response = await this.client.post('/auth/login', {
      username,
      password,
    });
    if (response.data.token) {
      this.setToken(response.data.token);
    }
    return response.data;
  }

  async getMe() {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  // Portfolio endpoints
  async getPortfolio() {
    const response = await this.client.get('/portfolio');
    return response.data;
  }

  async getPortfolioHistory(days: number = 30) {
    const response = await this.client.get(`/portfolio/history?days=${days}`);
    return response.data;
  }

  async getDiversification() {
    const response = await this.client.get('/portfolio/diversification');
    return response.data;
  }

  // Stock endpoints
  async getStock(ticker: string) {
    const response = await this.client.get(`/stocks/${ticker}`);
    return response.data;
  }

  async searchStocks(query: string) {
    const response = await this.client.get('/stocks/search', {
      params: { q: query },
    });
    return response.data;
  }

  async getStocksBySector(sector: string) {
    const response = await this.client.get(`/stocks/sector/${sector}`);
    return response.data;
  }

  async getAllSectors() {
    const response = await this.client.get('/stocks/sectors');
    return response.data;
  }

  // Transaction endpoints
  async buyStock(ticker: string, shares: number) {
    const response = await this.client.post('/transactions/buy', {
      ticker,
      shares,
    });
    return response.data;
  }

  async sellStock(ticker: string, shares: number) {
    const response = await this.client.post('/transactions/sell', {
      ticker,
      shares,
    });
    return response.data;
  }

  async getTransactionHistory(limit: number = 50, offset: number = 0) {
    const response = await this.client.get('/transactions/history', {
      params: { limit, offset },
    });
    return response.data;
  }

  async getCooldownStatus(ticker: string) {
    const response = await this.client.get(`/transactions/cooldown/${ticker}`);
    return response.data;
  }

  // Learning endpoints
  async getUserLearning() {
    const response = await this.client.get('/learning/learning');
    return response.data;
  }

  async getLessonsByLevel(level: number) {
    const response = await this.client.get(`/learning/level/${level}`);
    return response.data;
  }

  async getLesson(lessonId: string) {
    const response = await this.client.get(`/learning/lessons/${lessonId}`);
    return response.data;
  }

  async completeLesson(lessonId: string) {
    const response = await this.client.post(`/learning/lessons/${lessonId}/complete`);
    return response.data;
  }

  async submitQuiz(lessonId: string, answers: Record<number, number>) {
    const response = await this.client.post(`/learning/quiz/${lessonId}/submit`, {
      answers,
    });
    return response.data;
  }

  async getAvailableLessons() {
    const response = await this.client.get('/learning/available');
    return response.data;
  }

  // Token management
  private setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  private removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  logout() {
    this.removeToken();
  }
}

export const apiClient = new APIClient();
