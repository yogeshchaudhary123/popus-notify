/**
 * Popus Notify - A tiny toast factory
 */

class Popus {
    constructor() {
        this.containers = {};
        this.defaultOptions = {
            duration: 3000,
            position: 'bottom-right',
            closable: true,
            pauseOnHover: true,
            icon: null,
            onClose: null
        };
    }

    _getContainer(position) {
        if (!this.containers[position]) {
            const container = document.createElement('div');
            container.className = `popus-container ${position}`;
            document.body.appendChild(container);
            this.containers[position] = container;
        }
        return this.containers[position];
    }

    show(message, type = 'info', options = {}) {
        const settings = { ...this.defaultOptions, ...options };
        const container = this._getContainer(settings.position);

        const toast = document.createElement('div');
        toast.className = `popus-toast popus-${type}`;

        // Accessibility
        toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
        toast.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');

        // Icon support
        if (settings.icon) {
            const iconWrapper = document.createElement('div');
            iconWrapper.className = 'popus-icon';
            iconWrapper.innerHTML = settings.icon;
            toast.appendChild(iconWrapper);
        }

        const content = document.createElement('div');
        content.className = 'popus-content';
        content.innerHTML = message; // Use innerHTML to support HTML content
        toast.appendChild(content);

        if (settings.closable) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'popus-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.setAttribute('aria-label', 'Close notification');
            closeBtn.onclick = () => this.dismiss(toast, settings.onClose);
            toast.appendChild(closeBtn);
        }

        // Progress bar
        let progressBar = null;
        if (settings.duration > 0) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'popus-progress';
            progressBar = document.createElement('div');
            progressBar.className = 'popus-progress-bar';
            progressContainer.appendChild(progressBar);
            toast.appendChild(progressContainer);

            progressBar.style.transition = `transform ${settings.duration}ms linear`;
            progressBar.style.transform = 'scaleX(1)';

            // Delay to ensure transition runs
            requestAnimationFrame(() => {
                progressBar.style.transform = 'scaleX(0)';
            });
        }

        container.appendChild(toast);

        // Timer logic
        let remainingTime = settings.duration;
        let startTime = Date.now();
        let timeoutId = null;

        const startTimer = (time) => {
            if (time <= 0) return;
            timeoutId = setTimeout(() => {
                this.dismiss(toast, settings.onClose);
            }, time);
        };

        if (settings.duration > 0) {
            startTimer(settings.duration);

            if (settings.pauseOnHover) {
                toast.onmouseenter = () => {
                    clearTimeout(timeoutId);
                    remainingTime -= Date.now() - startTime;
                    if (progressBar) {
                        const computedStyle = window.getComputedStyle(progressBar);
                        const matrix = new WebKitCSSMatrix(computedStyle.transform);
                        progressBar.style.transition = 'none';
                        progressBar.style.transform = `scaleX(${matrix.a})`;
                    }
                };

                toast.onmouseleave = () => {
                    startTime = Date.now();
                    if (progressBar) {
                        progressBar.style.transition = `transform ${remainingTime}ms linear`;
                        progressBar.style.transform = 'scaleX(0)';
                    }
                    startTimer(remainingTime);
                };
            }
        }

        return toast;
    }

    dismiss(toast, onClose = null) {
        if (toast.classList.contains('popus-out')) return;

        toast.classList.add('popus-out');
        if (onClose) onClose();

        toast.addEventListener('animationend', () => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        });
    }

    success(msg, opts) { return this.show(msg, 'success', opts); }
    error(msg, opts) { return this.show(msg, 'error', opts); }
    info(msg, opts) { return this.show(msg, 'info', opts); }
    warn(msg, opts) { return this.show(msg, 'warn', opts); }
}

const popus = new Popus();

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = popus;
} else {
    window.popus = popus;
}
