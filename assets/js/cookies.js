// Cookie Consent Management
(function() {
  const COOKIE_NAME = 'mdn_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  // Default preferences
  const defaultPreferences = {
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    accepted: false
  };

  // Get saved preferences or default
  function getPreferences() {
    const saved = localStorage.getItem(COOKIE_NAME);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultPreferences;
      }
    }
    return defaultPreferences;
  }

  // Save preferences
  function savePreferences(prefs) {
    localStorage.setItem(COOKIE_NAME, JSON.stringify(prefs));
  }

  // Create cookie banner HTML
  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-banner__content">
        <div class="cookie-banner__text">
          <h3 class="cookie-banner__title">🍪 Utilizamos cookies</h3>
          <p class="cookie-banner__description">
            Usamos cookies para mejorar su experiencia en nuestro sitio. Puede aceptar todas las cookies o personalizar sus preferencias.
            <a href="privacy.html">Más información</a>
          </p>
        </div>
        <div class="cookie-banner__actions">
          <button type="button" class="cookie-banner__btn cookie-banner__btn--settings" onclick="window.showCookieSettings()">
            Configurar
          </button>
          <button type="button" class="cookie-banner__btn cookie-banner__btn--accept" onclick="window.acceptAllCookies()">
            Aceptar todo
          </button>
        </div>
      </div>
    `;
    return banner;
  }

  // Create settings modal HTML
  function createSettingsModal() {
    const prefs = getPreferences();
    const modal = document.createElement('div');
    modal.id = 'cookie-settings';
    modal.className = 'cookie-settings';
    modal.innerHTML = `
      <div class="cookie-settings__overlay" onclick="window.closeCookieSettings()"></div>
      <div class="cookie-settings__modal">
        <div class="cookie-settings__header">
          <h3 class="cookie-settings__title">Configuración de cookies</h3>
          <button type="button" class="cookie-settings__close" onclick="window.closeCookieSettings()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="cookie-settings__body">
          <p class="cookie-settings__intro">
            Puede elegir qué tipos de cookies desea permitir. Las cookies necesarias son esenciales para el funcionamiento del sitio y no se pueden desactivar.
          </p>
          
          <div class="cookie-settings__group">
            <div class="cookie-settings__option">
              <div class="cookie-settings__option-info">
                <h4>Cookies necesarias</h4>
                <p>Esenciales para el funcionamiento básico del sitio web. No se pueden desactivar.</p>
              </div>
              <label class="cookie-toggle cookie-toggle--disabled">
                <input type="checkbox" checked disabled>
                <span class="cookie-toggle__slider"></span>
              </label>
            </div>
            
            <div class="cookie-settings__option">
              <div class="cookie-settings__option-info">
                <h4>Cookies analíticas</h4>
                <p>Nos ayudan a entender cómo los visitantes interactúan con el sitio web.</p>
              </div>
              <label class="cookie-toggle">
                <input type="checkbox" id="cookie-analytics" ${prefs.analytics ? 'checked' : ''}>
                <span class="cookie-toggle__slider"></span>
              </label>
            </div>
            
            <div class="cookie-settings__option">
              <div class="cookie-settings__option-info">
                <h4>Cookies de marketing</h4>
                <p>Se utilizan para mostrar anuncios relevantes y medir la efectividad de campañas.</p>
              </div>
              <label class="cookie-toggle">
                <input type="checkbox" id="cookie-marketing" ${prefs.marketing ? 'checked' : ''}>
                <span class="cookie-toggle__slider"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="cookie-settings__footer">
          <button type="button" class="cookie-banner__btn cookie-banner__btn--settings" onclick="window.rejectAllCookies()">
            Rechazar opcionales
          </button>
          <button type="button" class="cookie-banner__btn cookie-banner__btn--accept" onclick="window.saveCookieSettings()">
            Guardar preferencias
          </button>
        </div>
      </div>
    `;
    return modal;
  }

  // Add styles
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #1a1a1a;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding: 20px;
        z-index: 9999;
        animation: slideUp 0.4s ease;
      }
      
      @keyframes slideUp {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      .cookie-banner__content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
      }
      
      .cookie-banner__title {
        font-family: 'Outfit', sans-serif;
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        margin: 0 0 8px;
      }
      
      .cookie-banner__description {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
        margin: 0;
        line-height: 1.5;
      }
      
      .cookie-banner__description a {
        color: #d8933f;
        text-decoration: none;
      }
      
      .cookie-banner__description a:hover {
        text-decoration: underline;
      }
      
      .cookie-banner__actions {
        display: flex;
        gap: 12px;
        flex-shrink: 0;
      }
      
      .cookie-banner__btn {
        padding: 12px 24px;
        font-size: 14px;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .cookie-banner__btn--settings {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #fff;
      }
      
      .cookie-banner__btn--settings:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.4);
      }
      
      .cookie-banner__btn--accept {
        background: #d8933f;
        color: #0a0a0a;
      }
      
      .cookie-banner__btn--accept:hover {
        background: #e5a555;
      }
      
      /* Settings Modal */
      .cookie-settings {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        animation: fadeIn 0.3s ease;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .cookie-settings__overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
      }
      
      .cookie-settings__modal {
        position: relative;
        background: #1a1a1a;
        border: 1px solid rgba(255, 255, 255, 0.1);
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideIn 0.3s ease;
      }
      
      @keyframes slideIn {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      .cookie-settings__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 24px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .cookie-settings__title {
        font-family: 'Outfit', sans-serif;
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        margin: 0;
      }
      
      .cookie-settings__close {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        padding: 4px;
        transition: color 0.3s ease;
      }
      
      .cookie-settings__close:hover {
        color: #fff;
      }
      
      .cookie-settings__body {
        padding: 24px;
      }
      
      .cookie-settings__intro {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.6);
        line-height: 1.6;
        margin: 0 0 24px;
      }
      
      .cookie-settings__group {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      
      .cookie-settings__option {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 16px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .cookie-settings__option-info h4 {
        font-family: 'Outfit', sans-serif;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        margin: 0 0 4px;
      }
      
      .cookie-settings__option-info p {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.5);
        margin: 0;
        line-height: 1.5;
      }
      
      /* Toggle Switch */
      .cookie-toggle {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 26px;
        flex-shrink: 0;
      }
      
      .cookie-toggle input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .cookie-toggle__slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background: rgba(255, 255, 255, 0.1);
        transition: 0.3s;
      }
      
      .cookie-toggle__slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background: #fff;
        transition: 0.3s;
      }
      
      .cookie-toggle input:checked + .cookie-toggle__slider {
        background: #d8933f;
      }
      
      .cookie-toggle input:checked + .cookie-toggle__slider:before {
        transform: translateX(22px);
      }
      
      .cookie-toggle--disabled {
        opacity: 0.6;
      }
      
      .cookie-toggle--disabled .cookie-toggle__slider {
        cursor: not-allowed;
      }
      
      .cookie-settings__footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 20px 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      /* Responsive */
      @media (max-width: 600px) {
        .cookie-banner__content {
          flex-direction: column;
          text-align: center;
        }
        
        .cookie-banner__actions {
          width: 100%;
          flex-direction: column;
        }
        
        .cookie-banner__btn {
          width: 100%;
        }
        
        .cookie-settings__footer {
          flex-direction: column;
        }
        
        .cookie-settings__footer .cookie-banner__btn {
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize
  function init() {
    addStyles();
    
    const prefs = getPreferences();
    
    // Show banner if not accepted yet
    if (!prefs.accepted) {
      document.body.appendChild(createBanner());
    }
  }

  // Global functions
  window.acceptAllCookies = function() {
    const prefs = {
      necessary: true,
      analytics: true,
      marketing: true,
      accepted: true
    };
    savePreferences(prefs);
    
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.animation = 'slideUp 0.3s ease reverse';
      setTimeout(() => banner.remove(), 300);
    }
  };

  window.rejectAllCookies = function() {
    const prefs = {
      necessary: true,
      analytics: false,
      marketing: false,
      accepted: true
    };
    savePreferences(prefs);
    closeCookieSettings();
    
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.animation = 'slideUp 0.3s ease reverse';
      setTimeout(() => banner.remove(), 300);
    }
  };

  window.showCookieSettings = function() {
    // Remove existing modal if any
    const existing = document.getElementById('cookie-settings');
    if (existing) existing.remove();
    
    document.body.appendChild(createSettingsModal());
    document.body.style.overflow = 'hidden';
  };

  window.closeCookieSettings = function() {
    const modal = document.getElementById('cookie-settings');
    if (modal) {
      modal.style.animation = 'fadeIn 0.2s ease reverse';
      setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
      }, 200);
    }
  };

  window.saveCookieSettings = function() {
    const analytics = document.getElementById('cookie-analytics')?.checked || false;
    const marketing = document.getElementById('cookie-marketing')?.checked || false;
    
    const prefs = {
      necessary: true,
      analytics,
      marketing,
      accepted: true
    };
    savePreferences(prefs);
    
    closeCookieSettings();
    
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.animation = 'slideUp 0.3s ease reverse';
      setTimeout(() => banner.remove(), 300);
    }
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
