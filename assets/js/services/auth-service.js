/**
 * "Imkon-Ish" — Authentication & Session Management Service
 * Provides validation, secure mock session management, role guards, and future Supabase/JWT backend integration.
 */

(function () {
  'use strict';

  class AuthService {
    constructor() {
      this.sessionKey = 'imkon_session_token';
    }

    /**
     * Validate registration and login input forms
     */
    validateCredentials(email, password, fullName = null, role = null) {
      const errors = [];

      if (!email || !email.trim()) {
        errors.push("Elektron pochta manzilini kiriting.");
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
          errors.push("Elektron pochta manzili formati noto'g'ri (masalan: ism@domen.uz).");
        }
      }

      if (!password) {
        errors.push("Parolni kiriting.");
      } else if (password.length < 6) {
        errors.push("Parol uzunligi kamida 6 ta belgidan iborat bo'lishi kerak.");
      }

      if (fullName !== null && (!fullName || fullName.trim().length < 3)) {
        errors.push("Iltimos, to'liq ism-familiyangizni kiriting (kamida 3 ta belgi).");
      }

      return {
        isValid: errors.length === 0,
        errors: errors
      };
    }

    /**
     * Authenticate user session
     */
    async login(email, password) {
      const validation = this.validateCredentials(email, password);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(' '));
      }

      // In Demo Mode: Match or generate appropriate profile
      const isEmployer = email.toLowerCase().includes('hr') || email.toLowerCase().includes('company');
      const isMentor = email.toLowerCase().includes('mentor') || email.toLowerCase().includes('surdo');

      const role = isEmployer ? 'employer' : (isMentor ? 'mentor' : 'candidate');
      const user = {
        id: 'usr-' + Date.now(),
        email: email.trim(),
        fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: role,
        title: role === 'employer' ? 'HR Boshqaruvchi' : (role === 'mentor' ? 'Surdotarjimon & Karyera Murabbiyi' : 'Dasturchi (Nomzod)'),
        avatar: email.substring(0, 2).toUpperCase(),
        accommodations: role === 'candidate' ? ['remote', 'screen_reader'] : []
      };

      if (window.Store) {
        window.Store.dispatch('AUTH_SET_USER', user);
      }

      return { success: true, user: user };
    }

    /**
     * Register a new candidate or employer
     */
    async register(fullName, email, password, role = 'candidate') {
      const validation = this.validateCredentials(email, password, fullName, role);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(' '));
      }

      const user = {
        id: 'usr-' + Date.now(),
        fullName: fullName.trim(),
        email: email.trim(),
        role: role,
        title: role === 'candidate' ? 'Mutaxassis (Nomzod)' : 'Inklyuziv Kompaniya HR',
        avatar: fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U',
        accommodations: role === 'candidate' ? ['remote'] : [],
        skills: role === 'candidate' ? ['IT & Veb'] : []
      };

      if (window.Store) {
        window.Store.dispatch('AUTH_SET_USER', user);
      }

      return { success: true, user: user };
    }

    /**
     * Terminate user session
     */
    logout() {
      if (window.Store) {
        window.Store.dispatch('AUTH_LOGOUT');
      }
    }

    /**
     * Get current active user
     */
    getCurrentUser() {
      return window.Store ? window.Store.getState().currentUser : null;
    }

    /**
     * Role authorization guard
     */
    hasRole(requiredRole) {
      const user = this.getCurrentUser();
      if (!user) return false;
      return user.role === requiredRole;
    }
  }

  window.AuthService = new AuthService();
})();
