# Popus Notify

A tiny toast factory that pops messages onto the screen and vanishes politely. Lightweight, professional Snackbar-style notifications with zero dependencies.

## Features

- 🍞 **Lightweight**: Zero dependencies, minimal footprint.
- 🎨 **Modern Design**: Glassmorphism, smooth animations, and clean typography.
- 📍 **Flexible Positioning**: Supports 6 screen positions: `top-left`, `top-right`, `top-center`, `bottom-left`, `bottom-right`, `bottom-center`.
- ⏳ **Visual Feedback**: Real-time **Progress Bar** for auto-dismissible toasts.
- ⏸️ **Interaction**: **Pause on Hover** functionality for the timer and progress bar.
- ♿ **Accessible**: Integrated ARIA roles (`status`, `alert`) and keyboard support.
- �️ **TypeScript**: Built-in type definitions for a seamless developer experience.
- 🛠️ **Customizable**: Support for custom SVG icons and HTML content.
- 🎨 **Easy Theming**: Fully customizable using CSS variables.

## Installation

```bash
npm install popus-notify
```

## Quick Start

### 1. Include Styles
Import the pre-built CSS into your main entry file:

```javascript
import 'popus-notify/styles.css';
```

### 2. Basic Usage
The library exports a singleton instance called `popus`.

```javascript
import popus from 'popus-notify';

// Simple types
popus.success('Operation successful!');
popus.error('Something went wrong.');
popus.info('New message received.');
popus.warn('Warning: Low battery.');
```

### 3. Advanced Usage
Unlock more control with the `show` method or by passing options to the shortcuts.

```javascript
popus.show('<strong>Bold</strong> content supported!', 'info', {
  duration: 5000,
  position: 'top-center',
  closable: true,
  pauseOnHover: true,
  icon: '<svg>...</svg>' // Custom SVG icon support
});
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | `number` | `3000` | Duration in ms before dismissal (0 for manual only). |
| `position` | `string` | `'bottom-right'` | Position on screen. |
| `closable` | `boolean` | `true` | Whether to show the manual close (×) button. |
| `pauseOnHover`| `boolean` | `true` | Pauses timer and progress bar when hovered. |
| `icon` | `string` | `null` | Custom SVG string for the notification icon. |
| `onClose` | `function`| `null` | Callback function executed after dismissal. |

## Custom Theming

You can easily theme `popus-notify` by overriding these CSS variables:

```css
:root {
  --popus-bg: rgba(255, 255, 255, 0.9);
  --popus-text: #1e293b;
  --popus-success: #10b981;
  --popus-error: #ef4444;
  --popus-radius: 8px;
  --popus-font: 'Inter', sans-serif;
}
```

## License

MIT
