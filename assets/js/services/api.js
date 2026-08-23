/**
 * "Imkon-Ish" — Universal API Service Adapter
 * Provides a unified asynchronous interface for data fetching, backend integration (REST / Supabase),
 * and transparent local fallback handling when DEMO_MODE is active.
 */

(function () {
  'use strict';

  class ApiService {
    constructor() {
      // Configure base endpoint (can be updated dynamically or via environment)
      this.baseUrl = window.APP_CONFIG?.API_BASE_URL || '/api/v1';
      this.isDemoMode = window.APP_CONFIG?.DEMO_MODE !== false; // Default to demo mode in MVP
      this.timeoutMs = 8000;
    }

    /**
     * Escape and sanitize HTML strings to prevent XSS injection
     */
    sanitize(str) {
      if (str === null || str === undefined) return '';
      if (typeof str !== 'string') return String(str);
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    }

    /**
     * Generic asynchronous HTTP client with timeout and error handling
     */
    async request(endpoint, options = {}) {
      if (this.isDemoMode) {
        // Return demo response simulated asynchronously
        return this.handleDemoRequest(endpoint, options);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
          ...options,
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(options.headers || {})
          }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP xatosi: ${response.status}`);
        }

        return await response.json();
      } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          throw new Error("Tarmoq so'rovi vaqti tugadi (Timeout). Iltimos, internetingizni tekshiring.");
        }
        throw err;
      }
    }

    /**
     * Internal mock router for offline MVP Demo Mode
     */
    async handleDemoRequest(endpoint, options = {}) {
      // Simulate realistic network latency (100ms - 250ms)
      await new Promise(r => setTimeout(r, 120));

      const store = window.Store ? window.Store.getState() : {};
      const data = window.APP_DATA || {};

      if (endpoint.startsWith('/vacancies')) {
        return { success: true, data: data.vacancies || [] };
      }

      if (endpoint.startsWith('/candidates')) {
        return { success: true, data: store.candidates || data.candidates || [] };
      }

      if (endpoint.startsWith('/applications')) {
        return { success: true, data: store.applications || [] };
      }

      if (endpoint.startsWith('/user/profile')) {
        return { success: true, data: store.currentUser || null };
      }

      return { success: true, message: 'Operatsiya muvaffaqiyatli bajarildi (Demo Mode)', data: null };
    }

    // ==========================================
    // Core Domain Service Methods
    // ==========================================

    async getVacancies(filters = {}) {
      return this.request('/vacancies', { method: 'GET' });
    }

    async getCandidates(filters = {}) {
      return this.request('/candidates', { method: 'GET' });
    }

    async applyForJob(applicationData) {
      if (this.isDemoMode && window.Store) {
        window.Store.dispatch('APPLY_JOB', applicationData);
        return { success: true, message: 'Ariza muvaffaqiyatli topshirildi' };
      }
      return this.request('/applications', {
        method: 'POST',
        body: JSON.stringify(applicationData)
      });
    }

    async sendChatMessage(payload) {
      if (this.isDemoMode && window.Store) {
        window.Store.dispatch('SEND_CHAT_MESSAGE', payload);
        return { success: true, message: 'Xabar yuborildi' };
      }
      return this.request('/chat/messages', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
    }
  }

  window.ApiService = new ApiService();
})();
