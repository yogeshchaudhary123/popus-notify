/**
 * Options for the popus notification
 */
export interface PopusOptions {
    /**
     * Duration in milliseconds before the notification is automatically dismissed.
     * Set to 0 to keep the notification until manually closed.
     * @default 3000
     */
    duration?: number;

    /**
     * Position of the notification on the screen.
     * @default 'bottom-right'
     */
    position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

    /**
     * Whether to show a close button.
     * @default true
     */
    closable?: boolean;

    /**
     * Callback function called when the notification is dismissed.
     */
    onClose?: () => void;

    /**
     * Whether to pause the timer when the user hovers over the notification.
     * @default true
     */
    pauseOnHover?: boolean;

    /**
     * Custom HTML for the icon or content area.
     */
    icon?: string;
}

/**
 * Toast types
 */
export type PopusType = 'success' | 'error' | 'info' | 'warn';

/**
 * The Popus notification manager
 */
export interface PopusInterface {
    /**
     * Show a generic notification
     * @param message The message to display (can be HTML)
     * @param type The type of notification
     * @param options Configuration options
     */
    show(message: string, type?: PopusType, options?: PopusOptions): HTMLElement;

    /**
     * Show a success notification
     */
    success(message: string, options?: PopusOptions): HTMLElement;

    /**
     * Show an error notification
     */
    error(message: string, options?: PopusOptions): HTMLElement;

    /**
     * Show an info notification
     */
    info(message: string, options?: PopusOptions): HTMLElement;

    /**
     * Show a warning notification
     */
    warn(message: string, options?: PopusOptions): HTMLElement;

    /**
     * Manually dismiss a notification
     */
    dismiss(toast: HTMLElement): void;
}

declare const popus: PopusInterface;
export default popus;
