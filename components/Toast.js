/**
 * Toast notification component
 * @class Toast
 */
export class Toast {

    /**
     * Display a toast notification
     * @param {string} type - Toast type (success, error, warning, info)
     * @param {string} title - Toast title
     * @param {string} message - Toast message
     * @param {number} duration - Auto-close duration in ms (default 3000)
     */
    static show(type, title, message, duration = 3000) {
        const container = document.getElementById('toastContainer')
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        }

        const toast = document.createElement('div')
        toast.className = `toast toast-${type}`
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Fermer">×</button>
        `

        // I close the toast on click
        toast.querySelector('.toast-close').addEventListener('click', () => {
            Toast.#remove(toast)
        })

        container.appendChild(toast)

        // I auto-remove after duration
        setTimeout(() => {
            Toast.#remove(toast)
        }, duration)
    }

    /**
     * Remove a toast with animation
     * @param {HTMLElement} toast - Toast element to remove
     */
    static #remove(toast) {
        if (!toast.parentNode) return
        toast.classList.add('removing')
        toast.addEventListener('animationend', () => {
            toast.remove()
        })
    }

    /**
     * Shortcut for success toast
     * @param {string} message - Toast message
     */
    static success(message) {
        Toast.show('success', 'Succès', message)
    }

    /**
     * Shortcut for error toast
     * @param {string} message - Toast message
     */
    static error(message) {
        Toast.show('error', 'Erreur', message)
    }

    /**
     * Shortcut for warning toast
     * @param {string} message - Toast message
     */
    static warning(message) {
        Toast.show('warning', 'Attention', message)
    }

    /**
     * Shortcut for info toast
     * @param {string} message - Toast message
     */
    static info(message) {
        Toast.show('info', 'Info', message)
    }
}