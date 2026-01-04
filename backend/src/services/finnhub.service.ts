import axios from 'axios';

interface QuoteData {
  c: number; // Current price
  pc: number; // Previous close
  dp: number; // Change percent
}

interface CompanyProfile {
  name: string;
  marketCapitalization: number;
  industry: string;
}

interface Financials {
  peBasic?: number;
  pegRatio?: number;
  revenueGrowthTTM?: number;
}

class FinnhubService {
  private apiKey: string;
  private baseUrl = 'https://finnhub.io/api/v1';

  constructor() {
    this.apiKey = process.env.FINNHUB_API_KEY || '';
    if (!this.apiKey) {
      console.warn('FINNHUB_API_KEY not set in environment variables');
    }
  }

  async getQuote(ticker: string): Promise<QuoteData> {
    try {
      const response = await axios.get(`${this.baseUrl}/quote`, {
        params: { symbol: ticker.toUpperCase(), token: this.apiKey }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching quote for ${ticker}:`, error);
      throw error;
    }
  }

  async getCompanyProfile(ticker: string): Promise<CompanyProfile> {
    try {
      const response = await axios.get(`${this.baseUrl}/stock/profile2`, {
        params: { symbol: ticker.toUpperCase(), token: this.apiKey }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching company profile for ${ticker}:`, error);
      throw error;
    }
  }

  async getBasicFinancials(ticker: string): Promise<Financials> {
    try {
      const response = await axios.get(`${this.baseUrl}/stock/metric`, {
        params: { symbol: ticker.toUpperCase(), metric: 'all', token: this.apiKey }
      });
      return response.data.metric || {};
    } catch (error) {
      console.error(`Error fetching financials for ${ticker}:`, error);
      return {};
    }
  }

  async batchUpdateStocks(tickers: string[]) {
    const updates = [];

    for (const ticker of tickers) {
      try {
        const [quote, profile, financials] = await Promise.all([
          this.getQuote(ticker),
          this.getCompanyProfile(ticker),
          this.getBasicFinancials(ticker)
        ]);

        updates.push({
          ticker: ticker.toUpperCase(),
          price: quote.c,
          previousClose: quote.pc,
          changePercent: quote.dp,
          companyName: profile.name,
          sector: profile.industry || 'Technology',
          marketCap: profile.marketCapitalization,
          peRatio: financials.peBasic,
          pegRatio: financials.pegRatio,
          growthPercent: financials.revenueGrowthTTM
        });
      } catch (error) {
        console.error(`Failed to update ${ticker}:`, error);
      }
    }

    return updates;
  }

  async getCompanyNews(ticker: string, limit: number = 5) {
    try {
      const response = await axios.get(`${this.baseUrl}/company-news`, {
        params: {
          symbol: ticker.toUpperCase(),
          from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          to: new Date().toISOString().split('T')[0],
          token: this.apiKey
        }
      });
      return response.data.slice(0, limit);
    } catch (error) {
      console.error(`Error fetching news for ${ticker}:`, error);
      return [];
    }
  }

  async searchStocks(query: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: { q: query, token: this.apiKey }
      });
      return response.data.result || [];
    } catch (error) {
      console.error(`Error searching stocks for ${query}:`, error);
      return [];
    }
  }
}

export default new FinnhubService();
