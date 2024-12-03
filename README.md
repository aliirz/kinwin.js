# KinWin
[![CI](https://github.com/aliirz/kinwin.js/actions/workflows/ci.yml/badge.svg)](https://github.com/aliirz/kinwin.js/actions/workflows/ci.yml)

A minimalist DOM manipulation library with TypeScript support.

## Installation

```bash
npm install kinwin
```

> Note: Package will be available on npm soon. For now, you can install directly from GitHub:
> ```bash
> npm install github:aliirz/kinwin.js
> ```

## Usage

### TypeScript
```typescript
import { kw, Http } from 'kinwin';

// DOM Manipulation
const element = kw('#myId')
  .addClass('active')
  .attr('title', 'Active Element')
  .html('New Content');

// Event Handling
kw('.button').on('click', (e: Event) => {
  console.log('Clicked!', e.target);
});

// Form Handling
const form = kw('#myForm');
form.on('submit', async (e: Event) => {
  e.preventDefault();
  const data = form.serialize();
  
  // HTTP Requests
  try {
    const response = await Http.post('/api/submit', data);
    console.log('Success:', response);
  } catch (error) {
    console.error('Error:', error);
  }
});

// Animations
await kw('.modal')
  .fadeIn(300)
  .addClass('visible');

// Event Delegation
kw('#list').delegate('click', '.item', (e: Event) => {
  kw(e.target as Element).toggleClass('selected');
});
```

### JavaScript
```javascript
// DOM Manipulation
const element = kw('#myId')
  .addClass('active')
  .attr('title', 'Active Element')
  .html('New Content');

// Event Handling
kw('.button').on('click', (e) => {
  console.log('Clicked!', e.target);
});

// Form Handling
const form = kw('#myForm');
form.on('submit', async (e) => {
  e.preventDefault();
  const data = form.serialize();
  
  // HTTP Requests
  try {
    const response = await Http.post('/api/submit', data);
    console.log('Success:', response);
  } catch (error) {
    console.error('Error:', error);
  }
});

// Animations
kw('.modal')
  .fadeIn(300)
  .addClass('visible')
  .then(() => console.log('Animation complete'));

// Event Delegation
kw('#list').delegate('click', '.item', (e) => {
  kw(e.target).toggleClass('selected');
});
```

### Selectors
KinWin supports multiple selector types:
- ID: `kw('#id-attribute')` - select by ID
- Class: `kw('.class-attribute')` - select by class
- Name: `kw('@name-attribute')` - select by name attribute
- Tag: `kw('=tagname')` - select by tag name

### Available Methods

#### DOM Manipulation
- `html()` - Get/set HTML content
- `attr()` - Get/set attributes
- `val()` - Get/set form values
- `show()` - Show elements
- `hide()` - Hide elements
- `append()` - Append content
- `prepend()` - Prepend content
- `remove()` - Remove elements

#### Class Manipulation
- `addClass()` - Add classes
- `removeClass()` - Remove classes
- `toggleClass()` - Toggle classes
- `hasClass()` - Check class existence

#### Events
- `on()` - Add event listener
- `delegate()` - Event delegation
- `off()` - Remove event listener

#### Forms
- `serialize()` - Serialize form data
- `val()` - Get/set form values

#### HTTP (via Http utility)
- `Http.get()` - GET request
- `Http.post()` - POST request
- `Http.put()` - PUT request
- `Http.delete()` - DELETE request

#### Animations
- `fadeIn()` - Fade in
- `fadeOut()` - Fade out
- `slideIn()` - Slide in

## Browser Support
KinWin supports all modern browsers (Chrome, Firefox, Safari, Edge).

## License
MIT